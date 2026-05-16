import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Trash2, GripVertical } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

const COLUMNS = {
  todo: { title: 'A Fazer', color: 'border-purple-500' },
  doing: { title: 'Fazendo', color: 'border-yellow-500' },
  done: { title: 'Feito', color: 'border-green-500' },
};

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', status: 'todo' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const res = await fetch(`${API_URL}/tasks`);
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (err) {
      console.log('API não disponível, usando modo local');
    }
  }

  async function addTask() {
    if (!newTask.title.trim()) return;
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      if (res.ok) {
        const created = await res.json();
        setTasks([...tasks, created]);
      }
    } catch {
      setTasks([...tasks, { id: Date.now(), ...newTask }]);
    }
    setNewTask({ title: '', status: 'todo' });
    setShowForm(false);
  }

  async function deleteTask(id) {
    try {
      await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
    } catch {}
    setTasks(tasks.filter(t => t.id !== id));
  }

  async function onDragEnd(result) {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;

    setTasks(tasks.map(t =>
      t.id.toString() === draggableId ? { ...t, status: newStatus } : t
    ));

    try {
      await fetch(`${API_URL}/tasks/${draggableId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {}
  }

  function getTasksByStatus(status) {
    return tasks.filter(t => t.status === status);
  }

  return (
    <div>
      {/* Botão adicionar */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Nova Task
        </button>
      </div>

      {/* Form nova task */}
      {showForm && (
        <div className="mb-6 p-4 bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-xl shadow-sm transition-colors duration-300">
          <input
            type="text"
            placeholder="Título da task..."
            value={newTask.title}
            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && addTask()}
            className="w-full bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-500 mb-3 transition-colors"
            autoFocus
          />
          <div className="flex gap-2">
            <select
              value={newTask.status}
              onChange={e => setNewTask({ ...newTask, status: e.target.value })}
              className="bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:border-purple-500 transition-colors"
            >
              <option value="todo">A Fazer</option>
              <option value="doing">Fazendo</option>
              <option value="done">Feito</option>
            </select>
            <button
              onClick={addTask}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Adicionar
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-gray-200 dark:border-dark-600 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Board com colunas */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(COLUMNS).map(([status, { title, color }]) => (
            <Droppable key={status} droppableId={status}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-600 p-4 min-h-[400px] transition-colors duration-300 ${
                    snapshot.isDraggingOver ? 'border-purple-500/50 bg-purple-50 dark:bg-dark-700' : ''
                  }`}
                >
                  {/* Header da coluna */}
                  <div className={`flex items-center gap-2 mb-4 pb-3 border-b-2 ${color}`}>
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-700 dark:text-gray-200">
                      {title}
                    </h3>
                    <span className="ml-auto text-xs bg-gray-100 dark:bg-dark-600 px-2 py-0.5 rounded-full text-gray-500 dark:text-gray-400">
                      {getTasksByStatus(status).length}
                    </span>
                  </div>

                  {/* Cards */}
                  {getTasksByStatus(status).map((task, index) => (
                    <Draggable
                      key={task.id.toString()}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`group bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg p-3 mb-2 cursor-grab active:cursor-grabbing transition-all ${
                            snapshot.isDragging ? 'shadow-lg shadow-purple-500/20 border-purple-500/50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <span
                              {...provided.dragHandleProps}
                              className="text-gray-400 dark:text-gray-600 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <GripVertical size={14} />
                            </span>
                            <p className="text-sm text-gray-700 dark:text-gray-200 flex-1">{task.title}</p>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-gray-400 dark:text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default KanbanBoard;
