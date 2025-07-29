import { ref } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/firebase'
import {
  collection,
  query,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
  addDoc,
  getDocs,
  getDoc
} from 'firebase/firestore'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])

  const fetch = async () => {
    const q = query(collection(db, 'tasks'))
    const querySnapshot = await getDocs(q)
    tasks.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  }

  const fetchById = async id => {
    const taskDoc = await getDoc(doc(db, 'tasks', id))
    if (taskDoc.exists()) {
      return { ...taskDoc.data() }
    } else {
      throw new Error('Task not found')
    }
  }

  const save = async (task, id = null) =>
    id
      ? await updateDoc(doc(db, 'tasks', id), task)
      : await addDoc(collection(db, 'tasks'), task)

  const remove = async id => await deleteDoc(doc(db, 'tasks', id))

  return {
    tasks,
    fetch,
    fetchById,
    save,
    remove
  }
})
