// composables/useFirestore.js
import { ref, onUnmounted } from 'vue'
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit as qLimit,
  startAfter,
  onSnapshot
} from 'firebase/firestore'
import { db } from '@/firebase'
import { useSweet } from './useSweet'

export function useFirestore(collectionName) {
  const items = ref([])
  const lastVisible = ref(null)
  const hasMore = ref(true)
  const loading = ref(false)
  const unsubscribe = ref(null)
  const { toast, confirm } = useSweet()

  const buildQuery = ({ filters = [], order = [], limit = 10, start = null } = {}) => {
    let q = query(collection(db, collectionName))

    filters.forEach(([field, operator, value]) => {
      q = query(q, where(field, operator, value))
    })

    order.forEach(([field, direction = 'asc']) => {
      q = query(q, orderBy(field, direction))
    })

    if (limit) q = query(q, qLimit(limit))
    if (start) q = query(q, startAfter(start))

    return q
  }

  const getAll = async (options = {}, realtime = false) => {
    loading.value = true
    hasMore.value = true

    if (unsubscribe.value) unsubscribe.value()

    try {
      const q = buildQuery(options)
      if (realtime) {
        unsubscribe.value = onSnapshot(q, snapshot => {
          items.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        })
      } else {
        const snapshot = await getDocs(q)
        items.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        lastVisible.value = snapshot.docs[snapshot.docs.length - 1]
        hasMore.value = snapshot.docs.length >= (options?.limit || 10)
      }
    } catch (err) {
      toast('Erro ao buscar dados', err.message, 'error')
    } finally {
      loading.value = false
    }
  }

  const loadMore = async (options = {}) => {
    if (!lastVisible.value || !hasMore.value) return
    try {
      const q = buildQuery({ ...options, start: lastVisible.value })
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      items.value.push(...data)
      lastVisible.value = snapshot.docs[snapshot.docs.length - 1]
      if (snapshot.docs.length < (options?.limit || 10)) hasMore.value = false
    } catch (err) {
      toast('Erro ao carregar mais', err.message, 'error')
    }
  }

  const getById = async (id) => {
    try {
      const refDoc = doc(db, collectionName, id)
      const snapshot = await getDoc(refDoc)
      return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
    } catch (err) {
      toast('Erro ao buscar item', err.message, 'error')
      return null
    }
  }

  const create = async (data) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data)
      toast('Item criado com sucesso', '', 'success')
      return docRef.id
    } catch (err) {
      toast('Erro ao criar item', err.message, 'error')
      return null
    }
  }

  const update = async (id, data) => {
    try {
      await updateDoc(doc(db, collectionName, id), data)
      toast('Item atualizado', '', 'success')
    } catch (err) {
      toast('Erro ao atualizar item', err.message, 'error')
    }
  }

  const remove = async (id) => {
    const confirmed = await confirm('Deseja realmente remover?', 'Essa ação não pode ser desfeita!')
    if (!confirmed) return
    try {
      await deleteDoc(doc(db, collectionName, id))
      toast('Item removido', '', 'success')
    } catch (err) {
      toast('Erro ao remover item', err.message, 'error')
    }
  }

  onUnmounted(() => {
    if (unsubscribe.value) unsubscribe.value()
  })

  return {
    items,
    loading,
    hasMore,
    getAll,
    loadMore,
    getById,
    create,
    update,
    remove,
  }
}
