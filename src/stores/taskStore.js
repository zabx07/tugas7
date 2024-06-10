import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      { name: 'Go to the gym', completed: false, dueDate: '2023-03-01' },
      { name: 'Date with honey', completed: false, dueDate: '2023-03-05' },
    ],
  }),
  getters: {
    sortedTasks: (state) => (sortBy) => {
      return [...state.tasks].sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortBy === 'completed') {
          return a.completed - b.completed;
        } else if (sortBy === 'dueDate') {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
      });
    },
    incompleteTaskCount: (state) => {
      return state.tasks.filter(task => !task.completed).length;
    },
  },
  actions: {
    addTask(name, dueDate) {
      this.tasks.push({ name, completed: false, dueDate });
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    markAsCompleted(task) {
      const taskToUpdate = this.tasks.find(t => t.name === task.name);
      if (taskToUpdate) {
        taskToUpdate.completed = true;
      }
    },
  },
});
