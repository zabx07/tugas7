<template>
  <div class="activity-list">
    <h2>KEGIATAN AKU</h2>
    <div class="filters">
      <label for="show-completed">Lihat Berhasil:</label>
      <input type="checkbox" id="show-completed" v-model="showCompleted">
      <label for="sort-by">Urutkan:</label>
      <select id="sort-by" v-model="sortBy">
        <option value="name">Nama</option>
        <option value="completed">Selesai</option>
        <option value="dueDate">Tanggal</option>
      </select>
    </div>
    <ul>
      <li v-for="(activity, index) in filteredSortedActivities" :key="index">
        <input type="checkbox" v-model="activity.completed" @change="markAsCompleted(activity)">
        <span :class="{ completed: activity.completed }">{{ activity.name }}</span>
        <span v-if="activity.dueDate"> (Due: {{ activity.dueDate }})</span>
        <button @click="removeTask(index)">Cancel</button>
      </li>
    </ul>
    <div class="add-activity">
      <label for="new-activity-name">Nama:</label>
      <input type="text" id="new-activity-name" v-model="newActivityName">
      <label for="new-activity-dueDate">Tanggal:</label>
      <input type="date" id="new-activity-dueDate" v-model="newActivityDueDate">
      <button @click="addTask">Tambah</button>
    </div>
    <p>Tugas Selesai: {{ incompleteTaskCount }}</p>
  </div>
</template>

<script>
import { useTaskStore } from './stores/taskStore.js';
import { computed, ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const taskStore = useTaskStore();

    const showCompleted = ref(false);
    const sortBy = ref('name');
    const newActivityName = ref('');
    const newActivityDueDate = ref('');

    const filteredSortedActivities = computed(() => {
      return taskStore.sortedTasks(sortBy.value).filter(task => {
        return showCompleted.value || !task.completed;
      });
    });

    const addTask = () => {
      if (newActivityName.value.trim() === '') return;
      taskStore.addTask(newActivityName.value, newActivityDueDate.value);
      newActivityName.value = '';
      newActivityDueDate.value = '';
    };

    const removeTask = (index) => {
      taskStore.removeTask(index);
    };

    const markAsCompleted = (activity) => {
      if (activity.name.trim() === '') return;
      taskStore.markAsCompleted(activity);
    };

    return {
      showCompleted,
      sortBy,
      newActivityName,
      newActivityDueDate,
      filteredSortedActivities,
      incompleteTaskCount: taskStore.incompleteTaskCount,
      addTask,
      removeTask,
      markAsCompleted,
    };
  }
});
</script>

<style scoped>
.activity-list {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-image: url('./assets/mobil.jpg'); background-size: cover;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 10px;
}

input[type="checkbox"] {
  margin-right: 10px;
  accent-color: #4CAF50;
}

.completed {
  text-decoration: line-through;
  color: #ccc;
}

button {
  margin-left: auto;
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3e8e41;
}

.add-activity {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.add-activity label {
  margin-bottom: 5px;
  font-weight: bold;
}

.add-activity input[type="text"],
.add-activity input[type="date"] {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.add-activity button {
  align-self: flex-start;
}
</style>
