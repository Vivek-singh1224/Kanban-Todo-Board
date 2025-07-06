import React, { useState } from 'react'
import { MoreVertical, Eye, EyeOff, Plus, ClipboardList, List, Columns, X, LayoutDashboard, Hash, Trash, Pencil } from 'lucide-react'

// Add this style block at the top of your file (or move to index.css for global use)
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 8px;
    transition: background 0.2s;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #7c3aed;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #181c2a;
  }
  .custom-scrollbar {
    scrollbar-color: #444 #181c2a;
    scrollbar-width: thin;
  }
  @media (prefers-color-scheme: dark) {
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #444;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #a78bfa;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #181c2a;
    }
    .custom-scrollbar {
      scrollbar-color: #444 #181c2a;
    }
  }
`;

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Helper for theme classes
  const theme = darkMode ? 'dark' : 'light';
  const bgMain = darkMode ? 'bg-gray-900' : 'bg-gray-100';
  const textMain = darkMode ? 'text-white' : 'text-gray-900';
  const navBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const sidebarBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const columnBg = darkMode ? 'bg-gray-800' : 'bg-gray-100';
  const taskBg = darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200';
  const btnPrimary = darkMode ? 'bg-violet-600 hover:bg-violet-500 text-white' : 'bg-violet-500 hover:bg-violet-400 text-white';
  const btnSidebar = darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900';

  // Custom scrollbar styles for modal
  const modalScrollbar = {
    scrollbarWidth: 'thin',
    scrollbarColor: '#222 #444',
  };

  // Detect dark mode using window.matchMedia (for modal logic)
  const isDarkMode = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Board state: columns, each with tasks, each with subtasks
  const [columns, setColumns] = useState([
    {
      id: 1,
      name: 'TODO',
      tasks: [
        { id: 1, title: 'Build UI for onboarding flow', subtasks: [ { title: 'Subtask 1', done: false }, { title: 'Subtask 2', done: false }, { title: 'Subtask 3', done: false } ] },
        { id: 2, title: 'Build UI for search', subtasks: [ { title: 'Subtask 1', done: false } ] },
        { id: 3, title: 'Build settings UI', subtasks: [ { title: 'Subtask 1', done: false }, { title: 'Subtask 2', done: false } ] },
        { id: 4, title: 'QA and test all major user journeys', subtasks: [ { title: 'Subtask 1', done: false }, { title: 'Subtask 2', done: false } ] },
      ]
    },
    {
      id: 2,
      name: 'DOING',
      tasks: [
        { id: 5, title: 'Design settings and search pages', subtasks: [ { title: 'Subtask 1', done: false }, { title: 'Subtask 2', done: false }, { title: 'Subtask 3', done: false } ] },
        { id: 6, title: 'Add account management endpoints', subtasks: [ { title: 'Subtask 1', done: false }, { title: 'Subtask 2', done: false } ] },
        { id: 7, title: 'Design onboarding flow', subtasks: [ { title: 'Subtask 1', done: false }, { title: 'Subtask 2', done: false }, { title: 'Subtask 3', done: false } ] },
        { id: 8, title: 'Add search endpoints', subtasks: [ { title: 'Subtask 1', done: false }, { title: 'Subtask 2', done: false } ] },
        { id: 9, title: 'Add authentication endpoints', subtasks: [ { title: 'Subtask 1', done: false }, { title: 'Subtask 2', done: false } ] },
        { id: 10, title: 'Research pricing points of various competitors and trial different business models', subtasks: [ { title: 'Subtask 1', done: false }, { title: 'Subtask 2', done: false } ] },
      ]
    },
    {
      id: 3,
      name: 'DONE',
      tasks: [
        { id: 11, title: 'Conduct 6 wireframe tests', subtasks: [ { title: 'Subtask 1', done: false }, { title: 'Subtask 2', done: false } ] },
        { id: 12, title: 'Create wireframe prototype endpoints', subtasks: [ { title: 'Subtask 1', done: false }, { title: 'Subtask 2', done: false } ] },
        { id: 13, title: 'Review results of usability tests and iterate', subtasks: [ { title: 'Subtask 1', done: false }, { title: 'Subtask 2', done: false }, { title: 'Subtask 3', done: false } ] },
        { id: 14, title: 'Create paper prototypes and conduct 10 usability tests with potential customers', subtasks: [ { title: 'Subtask 1', done: false }, { title: 'Subtask 2', done: false } ] },
        { id: 15, title: 'Market discovery', subtasks: [ { title: 'Subtask 1', done: false } ] },
        { id: 16, title: 'Competitor analysis', subtasks: [ { title: 'Subtask 1', done: false }, { title: 'Subtask 2', done: false } ] },
        { id: 17, title: 'Research the market', subtasks: [ { title: 'Subtask 1', done: false }, { title: 'Subtask 2', done: false } ] },
      ]
    }
  ]);

  // Modal state and form fields
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskSubtasks, setTaskSubtasks] = useState(['']);
  const [taskStatus, setTaskStatus] = useState(0); // index of column

  // Open modal
  const openTaskModal = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskSubtasks(['']);
    setTaskStatus(0);
    setShowTaskModal(true);
  };

  // Add subtask field
  const addSubtaskField = () => setTaskSubtasks([...taskSubtasks, '']);
  // Remove subtask field
  const removeSubtaskField = (idx: number) => setTaskSubtasks(taskSubtasks.filter((_, i) => i !== idx));
  // Update subtask value
  const updateSubtask = (idx: number, value: string) => setTaskSubtasks(taskSubtasks.map((s, i) => i === idx ? value : s));

  // Add new task modal logic for multi-board/column
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    setBoards(boards => boards.map((board, bIdx) => bIdx === activeBoardIdx ? {
      ...board,
      columns: board.columns.map((col, idx) =>
        idx === taskStatus
          ? {
              ...col,
              tasks: [
                ...col.tasks,
                {
                  id: Date.now(),
                  title: taskTitle.trim(),
                  description: taskDescription.trim(),
                  subtasks: taskSubtasks.filter(s => s.trim()).map(s => ({ title: s.trim(), done: false }))
                }
              ]
            }
          : col
      )
    } : board));
    setShowTaskModal(false);
  };

  // Add/Edit Columns modal state
  const [showEditColumnsModal, setShowEditColumnsModal] = useState(false);
  const [editColumns, setEditColumns] = useState<{id: number, name: string, tasks: any[]}[]>([]);
  const [editBoardName] = useState('Platform Launch');
  const [editError, setEditError] = useState('');

  const openEditColumnsModal = () => {
    setEditColumns(columns.map(col => ({ ...col })));
    setEditError('');
    setShowEditColumnsModal(true);
  };

  const addEditColumn = () => setEditColumns([...editColumns, { id: Date.now(), name: '', tasks: [] }]);
  const removeEditColumn = (idx: number) => setEditColumns(editColumns.filter((_, i) => i !== idx));
  const updateEditColumn = (idx: number, value: string) => setEditColumns(editColumns.map((c, i) => i === idx ? { ...c, name: value } : c));

  const handleSaveEditColumns = (e: React.FormEvent) => {
    e.preventDefault();
    if (editColumns.some(col => !col.name.trim())) {
      setEditError('Column names cannot be empty');
      return;
    }
    setColumns(editColumns.map(col => ({ ...col, name: col.name.trim() })));
    setShowEditColumnsModal(false);
  };

  // Boards state (multi-board support)
  const [boards, setBoards] = useState([
    { name: 'Platform Launch', columns }
  ]);
  const [activeBoardIdx, setActiveBoardIdx] = useState(0);

  // Add New Board modal state
  const [showAddBoardModal, setShowAddBoardModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const defaultColumns = [
    { name: 'TODO', id: 1 },
    { name: 'DOING', id: 2 },
    { name: 'DONE', id: 3 }
  ];
  const [newBoardColumns, setNewBoardColumns] = useState(['TODO', 'DOING', 'DONE']);
  const [boardError, setBoardError] = useState('');

  const openAddBoardModal = () => {
    setNewBoardName('');
    setNewBoardColumns(['TODO', 'DOING', 'DONE']);
    setBoardError('');
    setShowAddBoardModal(true);
  };

  const addNewBoardColumn = () => setNewBoardColumns([...newBoardColumns, '']);
  const updateNewBoardColumn = (idx: number, value: string) => {
    // Prevent renaming the first three columns
    if (idx < 3) return;
    setNewBoardColumns(newBoardColumns.map((c, i) => i === idx ? value : c));
  };
  const removeNewBoardColumn = (idx: number) => {
    // Prevent deleting the first three columns
    if (idx < 3) return;
    setNewBoardColumns(newBoardColumns.filter((_, i) => i !== idx));
  };

  const handleCreateBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardName.trim()) {
      setBoardError('Board name cannot be empty');
      return;
    }
    // Always ensure the first three columns are TODO, DOING, DONE
    const columnsToAdd = [
      { name: 'TODO', id: Date.now() + 1, tasks: [] },
      { name: 'DOING', id: Date.now() + 2, tasks: [] },
      { name: 'DONE', id: Date.now() + 3, tasks: [] },
      ...newBoardColumns.slice(3).map((name, idx) => ({ id: Date.now() + 4 + idx, name: name.trim(), tasks: [] }))
    ];
    if (columnsToAdd.slice(3).some(col => !col.name.trim())) {
      setBoardError('Column names cannot be empty');
      return;
    }
    setBoards([
      ...boards,
      {
        name: newBoardName.trim(),
        columns: columnsToAdd
      }
    ]);
    setActiveBoardIdx(boards.length); // switch to new board
    setShowAddBoardModal(false);
  };

  // Task details modal state
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [selectedTaskColIdx, setSelectedTaskColIdx] = useState<number | null>(null);

  // Open task details modal
  const openTaskDetails = (task: any, colIdx: number) => {
    setSelectedTask({ ...task });
    setSelectedTaskColIdx(colIdx);
    setShowTaskDetails(true);
  };

  // Toggle subtask completion
  const toggleSubtask = (subIdx: number) => {
    if (selectedTask && selectedTask.subtasks) {
      const updated = { ...selectedTask };
      updated.subtasks = updated.subtasks.map((s: any, i: number) => i === subIdx ? { ...s, done: !s.done } : s);
      setSelectedTask(updated);
    }
  };

  // Change task status (move to another column)
  const changeTaskStatus = (newColIdx: number) => {
    if (selectedTaskColIdx === null || selectedTaskColIdx === newColIdx) return;
    // Remove from old column
    const oldCol = boards[activeBoardIdx].columns[selectedTaskColIdx];
    const newCol = boards[activeBoardIdx].columns[newColIdx];
    const updatedOldCol = { ...oldCol, tasks: oldCol.tasks.filter((t: any) => t.id !== selectedTask.id) };
    const updatedNewCol = { ...newCol, tasks: [...newCol.tasks, selectedTask] };
    setBoards(boards => boards.map((board, bIdx) => bIdx === activeBoardIdx ? {
      ...board,
      columns: board.columns.map((col, cIdx) =>
        cIdx === selectedTaskColIdx ? updatedOldCol : cIdx === newColIdx ? updatedNewCol : col
      )
    } : board));
    setShowTaskDetails(false);
  };

  // Save subtask completion to board state
  const saveSubtasks = () => {
    if (selectedTaskColIdx === null) return;
    setBoards(boards => boards.map((board, bIdx) => bIdx === activeBoardIdx ? {
      ...board,
      columns: board.columns.map((col, cIdx) =>
        cIdx === selectedTaskColIdx ? {
          ...col,
          tasks: col.tasks.map((t: any) => t.id === selectedTask.id ? selectedTask : t)
        } : col
      )
    } : board));
    setShowTaskDetails(false);
  };

  // Delete task from board
  const deleteTask = () => {
    if (selectedTaskColIdx === null) return;
    setBoards(boards => boards.map((board, bIdx) => bIdx === activeBoardIdx ? {
      ...board,
      columns: board.columns.map((col, cIdx) =>
        cIdx === selectedTaskColIdx ? {
          ...col,
          tasks: col.tasks.filter((t: any) => t.id !== selectedTask.id)
        } : col
      )
    } : board));
    setShowTaskDetails(false);
  };

  // Delete confirmation modal state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Edit task modal state
  const [isEditingTask, setIsEditingTask] = useState(false);

  // Open edit task modal
  const openEditTask = () => {
    setTaskTitle(selectedTask.title);
    setTaskDescription(selectedTask.description || '');
    setTaskSubtasks(selectedTask.subtasks.map((s: any) => s.title));
    setTaskStatus(selectedTaskColIdx ?? 0);
    setIsEditingTask(true);
    setShowTaskDetails(false);
    setShowTaskModal(true);
  };

  // Save edited task
  const handleEditTask = (e: React.FormEvent) => {
    e.preventDefault();
    setBoards(boards => boards.map((board, bIdx) => bIdx === activeBoardIdx ? {
      ...board,
      columns: board.columns.map((col, idx) =>
        idx === taskStatus
          ? {
              ...col,
              tasks: col.tasks.some((t: any) => t.id === selectedTask.id)
                ? col.tasks.map((t: any) => t.id === selectedTask.id
                  ? {
                      ...t,
                      title: taskTitle.trim(),
                      description: taskDescription.trim(),
                      subtasks: taskSubtasks.filter(s => s.trim()).map((s, i) => ({
                        title: s.trim(),
                        done: selectedTask.subtasks[i]?.done || false
                      }))
                    }
                  : t)
                : [...col.tasks, {
                    id: selectedTask.id,
                    title: taskTitle.trim(),
                    description: taskDescription.trim(),
                    subtasks: taskSubtasks.filter(s => s.trim()).map(s => ({ title: s.trim(), done: false }))
                  }]
            }
          : idx === selectedTaskColIdx
            ? { ...col, tasks: col.tasks.filter((t: any) => t.id !== selectedTask.id) }
            : col
      )
    } : board));
    setShowTaskModal(false);
    setIsEditingTask(false);
  };

  return (
    <div className={`h-screen ${bgMain} ${textMain} flex flex-col`}>
      {/* Top Nav Bar */}
      <nav className={`flex items-stretch justify-between ${navBg} px-0 h-20 border-b flex-shrink-0`}>
        {/* Kanban logo/name section, same width as sidebar */}
        <div className="flex items-stretch h-full">
          <div className="w-64 flex items-center gap-2 px-8 h-full border-r" style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}>
            {/* Kanban Logo */}
            {darkMode ? (
              <img src="src/assets/logo-light.4fb0dd87.svg" alt="Kanban Logo"  />
            ) : (
              <img src="src/assets/logo-light.4fb0dd87.svg" alt="Kanban Logo" className=" filter invert-0" style={{ filter: 'invert(1) hue-rotate(180deg)' }} />
            )}
          </div>
          <span className="text-xl font-bold ml-8 flex items-center">Platform Launch</span>
        </div>
        <div className="flex items-center gap-4 px-8">
          <button className={`${btnPrimary} font-semibold px-6 py-2 rounded-full transition-colors`} onClick={openTaskModal}>+ Add New task</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700">
            <MoreVertical className="h-6 w-6 text-white" />
          </button>
        </div>
      </nav>
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className={`w-64 ${sidebarBg} p-4 flex flex-col justify-between border-r flex-shrink-0`}>
            <div>
              <div className="font-semibold mb-2">ALL BOARDS</div>
              <ul className="space-y-2 mb-8">
                {boards.map((board, idx) => (
                  <li
                    key={board.name + idx}
                    className={`rounded px-3 py-2 cursor-pointer ${activeBoardIdx === idx ? 'bg-violet-600 text-white' : 'hover:bg-gray-700 text-violet-200'}`}
                    onClick={() => setActiveBoardIdx(idx)}
                  >
                    {board.name}
                  </li>
                ))}
              </ul>
              <button className="text-violet-400 hover:text-violet-200 mb-8" onClick={openAddBoardModal}>+ Create New Board</button>
            </div>
            <div>
              {/* Modern Theme Toggle Switch (single icon) */}
              <div className={`flex items-center justify-center mb-4`}>
                <button
                  aria-label="Toggle dark mode"
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-16 h-8 flex items-center rounded-full transition-colors duration-300 focus:outline-none ${darkMode ? 'bg-violet-600' : 'bg-yellow-400'}`}
                >
                  {/* Thumb with single icon */}
                  <span
                    className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center text-lg ${darkMode ? 'translate-x-8' : 'translate-x-0'}`}
                  >
                    {darkMode ? '🌙' : '☀️'}
                  </span>
                </button>
              </div>
              <button className={`${btnSidebar} w-full flex justify-center items-center`} onClick={() => setSidebarOpen(false)}>
                <EyeOff className="inline-block mr-2 w-4 h-4 align-middle" />
                Hide Sidebar
              </button>
            </div>
          </aside>
        )}
        {/* Main Board Area */}
        <main className="flex-1 p-8 overflow-y-auto overflow-x-auto custom-scrollbar min-h-0">
          <div className="flex gap-6 flex-nowrap pb-8">
            {boards[activeBoardIdx].columns.map((column, colIdx) => (
              <section key={column.id} className="w-80 min-w-[20rem] min-h-[400px]">
                <div className="flex items-center mb-4">
                  <span className={`w-3 h-3 rounded-full mr-2 ${colIdx === 0 ? 'bg-blue-500' : colIdx === 1 ? 'bg-violet-500' : 'bg-green-500'}`}></span>
                  <span className="uppercase tracking-widest text-xs">{column.name} ({column.tasks.length})</span>
                </div>
                <div className="space-y-4 pr-2 pt-4">
                  {column.tasks.length === 0 ? (
                    <div className="min-h-[400px] flex items-center justify-center rounded-lg border-2 border-dashed border-gray-700 bg-gradient-to-b from-gray-800 to-gray-900 text-violet-400 font-semibold text-base opacity-80">
                      No tasks yet
                    </div>
                  ) : (
                    column.tasks.map((task, idx) => (
                      <div
                        key={task.id}
                        className={`${taskBg} rounded p-4 cursor-pointer hover:ring-2 hover:ring-violet-400 transition kanban-card`}
                        onClick={() => openTaskDetails(task, colIdx)}
                      >
                        <div className="font-semibold text-base mb-2">{task.title}</div>
                        <div className="text-xs text-gray-400">{task.subtasks.filter(st => st.done).length} of {task.subtasks.length} subtasks</div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            ))}
            {/* + New Column Card */}
            <div className="p-8 bg-transparent">
              <button
               className={ (darkMode ? "w-80 min-w-[20rem] min-h-[400px]  flex items-center justify-center rounded-lg bg-white border-2 border-dashed border-gray-300 dark:bg-gradient-to-b  dark:from-gray-800 dark:to-gray-900 dark:border-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer text-violet-400 new-column-card": "bg-gradient-to-b from-white to-gray-100 border:none min-w-[20rem] min-h-[400px]  flex items-center justify-center rounded-lg  border-2 border-dashed border-gray-300 hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-violet-400 new-column-card")}
                onClick={openEditColumnsModal}
              >
                <span className="font-semibold text-xl">+ New Column</span>
              </button>
            </div>
          </div>
        </main>
        {/* Show Sidebar Button */}
        {!sidebarOpen && (
          <button
            className="fixed left-0 top-4/5 -translate-y-1/2 bg-violet-600 hover:bg-violet-500 text-white w-12 h-24 flex items-center justify-center rounded-full shadow-lg z-50 transition-colors duration-200"
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            onClick={() => setSidebarOpen(true)}
            aria-label="Show Sidebar"
          >
            <Eye className="w-6 h-6" />
          </button>
        )}
      </div>
      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <form
            className={`
              ${darkMode
                ? 'bg-gray-800 text-white border-none'
                : 'bg-white text-gray-900 border border-gray-200'}
              p-8 rounded-2xl w-full max-w-sm shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar kanban-form
            `}
            onSubmit={isEditingTask ? handleEditTask : handleCreateTask}
          >
            <h2 className="text-2xl font-bold mb-4 tracking-tight flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-violet-400" /> Add New Task
            </h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              className={`w-full mb-4 p-3 rounded-lg ${darkMode ? 'bg-gray-900 text-white border-gray-700 placeholder-gray-400' : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-400'} border focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition`}
              placeholder="Task title"
              value={taskTitle}
              onChange={e => setTaskTitle(e.target.value)}
              required
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className={`w-full mb-4 p-3 rounded-lg ${darkMode ? 'bg-gray-900 text-white border-gray-700 placeholder-gray-400' : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-400'} border focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition`}
              placeholder="Description (optional)"
              value={taskDescription}
              onChange={e => setTaskDescription(e.target.value)}
              rows={2}
            />
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <List className="w-5 h-5 text-violet-400" /> Subtasks
            </label>
            <div className="space-y-2 mb-4">
              {taskSubtasks.map((sub, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <List className="w-4 h-4 text-gray-400" />
                  <input
                    className={`flex-1 p-3 rounded-lg ${darkMode ? 'bg-gray-900 text-white border-gray-700 placeholder-gray-400' : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-400'} border focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition`}
                    placeholder={`Subtask ${idx + 1}`}
                    value={sub}
                    onChange={e => updateSubtask(idx, e.target.value)}
                  />
                  {taskSubtasks.length > 1 && (
                    <button type="button" className="ml-2 text-gray-400 hover:text-red-400" onClick={() => removeSubtaskField(idx)}>
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              className={`w-full mb-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-violet-600'} text-sm font-semibold flex items-center justify-center gap-1 shadow transition`}
              onClick={addSubtaskField}
            >
              <Plus className="w-4 h-4" /> Add New Subtask
            </button>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Columns className="w-5 h-5 text-violet-400" /> Status
            </label>
            <select
              className={`w-full mb-6 p-3 rounded-lg ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-50 text-gray-900 border-gray-300'} border focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition`}
              value={taskStatus}
              onChange={e => setTaskStatus(Number(e.target.value))}
            >
              {boards[activeBoardIdx].columns.map((col, idx) => (
                <option key={col.id} value={idx}>{col.name}</option>
              ))}
            </select>
            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="flex-1 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-base shadow transition flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" /> Create Task
              </button>
              <button
                type="button"
                className={`flex-1 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} font-semibold text-base shadow transition flex items-center justify-center gap-1`}
                onClick={() => setShowTaskModal(false)}
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Add/Edit Columns Modal */}
      {showEditColumnsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <form
            className={`
              ${darkMode
                ? 'bg-gray-800 text-white border-none'
                : 'bg-white text-gray-900 border border-gray-200'}
              p-8 rounded-2xl w-full max-w-sm shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar kanban-form
            `}
            onSubmit={handleSaveEditColumns}
          >
            <h2 className="text-2xl font-bold mb-4 tracking-tight flex items-center gap-2">
              <Columns className="w-6 h-6 text-violet-400" /> Edit Columns
            </h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">Board Name</label>
            <input className={`w-full mb-4 p-3 rounded-lg ${darkMode ? 'bg-gray-900 text-white border-gray-700 placeholder-gray-400' : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-400'} border focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition opacity-60`} value={editBoardName} disabled />
            <label className="block text-sm font-medium text-gray-700 mb-1">Columns</label>
            <div className="space-y-2 mb-4">
              {editColumns.map((col, idx) => (
                <div key={col.id} className="flex items-center gap-2">
                  <input className={`flex-1 p-3 rounded-lg ${darkMode ? 'bg-gray-900 text-white border-gray-700 placeholder-gray-400' : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-400'} border focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition`} value={col.name} onChange={e => updateEditColumn(idx, e.target.value)} placeholder={`Column ${idx + 1}`} />
                  {editColumns.length > 1 && (
                    <button type="button" className="ml-2 text-gray-400 hover:text-red-400" onClick={() => removeEditColumn(idx)}>
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" className={`w-full mb-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-violet-600'} text-sm font-semibold flex items-center justify-center gap-1 shadow transition`} onClick={addEditColumn}>
              <Plus className="w-4 h-4" /> Add New Column
            </button>
            {editError && <div className="text-xs text-red-400 mb-2">{editError}</div>}
            <button type="submit" className="w-full py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-base shadow transition mt-2">Save Changes</button>
          </form>
        </div>
      )}
      {/* Add New Board Modal */}
      {showAddBoardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <form
            className={`
              ${darkMode
                ? 'bg-gray-800 text-white border-none'
                : 'bg-white text-gray-900 border border-gray-200'}
              p-8 rounded-2xl w-full max-w-sm shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar kanban-form
            `}
            onSubmit={handleCreateBoard}
          >
            <h2 className="text-2xl font-bold mb-4 tracking-tight flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-violet-400" /> Add New Board
            </h2>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Hash className="w-4 h-4 text-violet-400" /> Name
            </label>
            <input
              className={`w-full mb-4 p-3 rounded-lg ${darkMode ? 'bg-gray-900 text-white border-gray-700 placeholder-gray-400' : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-400'} border focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition`}
              value={newBoardName}
              onChange={e => { setNewBoardName(e.target.value); setBoardError(''); }}
              placeholder="Board name"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <List className="w-4 h-4 text-violet-400" /> Columns
            </label>
            <div className="space-y-2 mb-4">
              {newBoardColumns.map((col, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <List className="w-4 h-4 text-gray-400" />
                  <input
                    className={`flex-1 p-3 rounded-lg ${darkMode ? 'bg-gray-900 text-white border-gray-700 placeholder-gray-400' : 'bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-400'} border focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition ${idx < 3 ? 'opacity-60 cursor-not-allowed' : ''}`}
                    value={col}
                    onChange={e => updateNewBoardColumn(idx, e.target.value)}
                    placeholder={`Column ${idx + 1}`}
                    disabled={idx < 3}
                  />
                  {newBoardColumns.length > 1 && idx >= 3 && (
                    <button type="button" className="ml-2 text-gray-400 hover:text-red-400" onClick={() => removeNewBoardColumn(idx)}>
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" className={`w-full mb-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-violet-600'} text-sm font-semibold flex items-center justify-center gap-1 shadow transition`} onClick={addNewBoardColumn}>
              <Plus className="w-4 h-4" /> Add New Column
            </button>
            {boardError && <div className="text-xs text-red-400 mb-2">{boardError}</div>}
            <button type="submit" className="w-full py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-base shadow transition flex items-center justify-center gap-1">
              <LayoutDashboard className="w-4 h-4" /> Create New Board
            </button>
          </form>
        </div>
      )}
      {/* Task Details Modal */}
      {showTaskDetails && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <div className={`
            ${darkMode
              ? 'bg-gray-800 text-white border-none'
              : 'bg-white text-gray-900 border border-gray-200'}
            p-8 rounded-2xl w-full max-w-sm shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar kanban-form
          `}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">{selectedTask.title}</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="text-gray-400 hover:text-violet-400 transition duration-200 hover:scale-110 focus:outline-none"
                  title="Edit Task"
                  onClick={openEditTask}
                >
                  <Pencil className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 transition duration-200 hover:scale-110 focus:outline-none"
                  title="Delete Task"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  className="text-gray-400 hover:text-red-400 transition duration-200 hover:scale-110 focus:outline-none"
                  title="Close"
                  onClick={() => setShowTaskDetails(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="text-gray-400 mb-4">{selectedTask.description || 'No description'}</div>
            <div className="mb-4">
              <div className="font-semibold text-sm mb-2">Subtasks ({selectedTask.subtasks.filter((s: any) => s.done).length} of {selectedTask.subtasks.length})</div>
              <div className="space-y-2 mb-4">
                {selectedTask.subtasks.map((sub: any, subIdx: number) => (
                  <label key={subIdx} className={`flex items-center gap-2 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} ${sub.done ? (darkMode ? 'bg-violet-700/60' : 'bg-violet-100/60') : ''}`}>
                    <input type="checkbox" checked={sub.done} onChange={() => toggleSubtask(subIdx)} className="accent-violet-500" />
                    <span className={`${sub.done ? 'line-through opacity-60' : ''}`}>{sub.title}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <div className="font-semibold text-sm mb-1">Current Status</div>
              <select
                className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-50 text-gray-900 border-gray-300'} border focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition`}
                value={selectedTaskColIdx ?? 0}
                onChange={e => changeTaskStatus(Number(e.target.value))}
              >
                {boards[activeBoardIdx].columns.map((col, idx) => (
                  <option key={col.id} value={idx}>{col.name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-4 mt-6">
              <button className="flex-1 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-base shadow transition" onClick={saveSubtasks}>Save</button>
              <button className={`flex-1 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} font-semibold text-base shadow transition`} onClick={() => setShowTaskDetails(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Task Confirmation Modal */}
      {showDeleteConfirm && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <div className={`
            ${darkMode
              ? 'bg-gray-800 text-white border-none'
              : 'bg-white text-gray-900 border border-gray-200'}
            p-8 rounded-2xl w-full max-w-sm shadow-2xl relative kanban-form
          `}>
            <h2 className="text-2xl font-bold mb-4 tracking-tight text-red-500">Delete this task?</h2>
            <div className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Are you sure you want to delete the '{selectedTask.title}' task? This action cannot be reversed.</div>
            <div className="flex gap-4 mt-6">
              <button
                className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-base shadow transition"
                onClick={() => { deleteTask(); setShowDeleteConfirm(false); }}
              >
                Delete
              </button>
              <button
                className={`flex-1 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} font-semibold text-base shadow transition`}
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Inject custom scrollbar styles */}
      <style>{scrollbarStyles}</style>
    </div>
  )
}

export default App