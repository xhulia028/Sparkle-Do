'use client'

import { useState, useEffect } from 'react'

interface Todo {
  id: number
  title: string
  completed: boolean
}

function Sparkles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const res = await fetch('/api/todos')
      const data = await res.json()
      setTodos(data)
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo }),
      })
      const todo = await res.json()
      setTodos([...todos, todo])
      setNewTodo('')
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  const toggleTodo = async (todo: Todo) => {
    try {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      })
      const updated = await res.json()
      setTodos(todos.map(t => t.id === todo.id ? updated : t))
    } catch (error) {
      console.error('Failed to update todo:', error)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      await fetch(`/api/todos/${id}`, { method: 'DELETE' })
      setTodos(todos.filter(t => t.id !== id))
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-purple-200 flex items-center justify-center">
        <p className="text-green-500 text-xl font-medium">✨ Loading... ✨</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-purple-200 py-8 relative overflow-hidden">
      <Sparkles />
      
      {/* Decorative hearts */}
      <div className="absolute top-10 left-10 text-4xl float-animation">💖</div>
      <div className="absolute top-20 right-16 text-3xl float-animation" style={{ animationDelay: '0.5s' }}>💕</div>
      <div className="absolute bottom-20 left-20 text-3xl float-animation" style={{ animationDelay: '1s' }}>🎀</div>
      <div className="absolute bottom-32 right-10 text-4xl float-animation" style={{ animationDelay: '1.5s' }}>✨</div>
      
      <div className="max-w-md mx-auto relative z-10">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 border-green-200">
          <h1 className="text-3xl font-bold text-center mb-2 shimmer-text">
            ✨ My Todo List ✨
          </h1>
          <p className="text-center text-green-400 mb-6 text-sm">stay organized, stay quirky! 💅</p>

          <form onSubmit={addTodo} className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add something cute to do... 🌸"
              className="flex-1 px-4 py-3 border-2 border-green-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-white/80 placeholder-green-300 text-green-600"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-green-300/50 hover:scale-105 font-medium"
            >
              Add 💖
            </button>
          </form>

          <ul className="space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-green-400 text-lg">No todos yet!</p>
                <p className="text-green-300 text-sm mt-1">Add your first one above 🌷</p>
              </div>
            ) : (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
                    todo.completed 
                      ? 'bg-green-100/50 border-2 border-green-200' 
                      : 'bg-white/60 border-2 border-green-300 shadow-md hover:shadow-lg hover:shadow-green-200/50'
                  }`}
                >
                  <button
                    onClick={() => toggleTodo(todo)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      todo.completed
                        ? 'bg-green-400 border-green-400 text-white'
                        : 'border-green-300 hover:border-green-400 hover:bg-green-50'
                    }`}
                  >
                    {todo.completed && '✓'}
                  </button>
                  <span
                    className={`flex-1 ${
                      todo.completed 
                        ? 'line-through text-green-300' 
                        : 'text-green-600'
                    }`}
                  >
                    {todo.title}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-3 py-1.5 text-green-400 hover:text-white hover:bg-green-400 rounded-full transition-all duration-300 text-sm"
                  >
                    ✕
                  </button>
                </li>
              ))
            )}
          </ul>
          
          {todos.length > 0 && (
            <p className="text-center text-green-300 text-xs mt-6">
              {todos.filter(t => t.completed).length} of {todos.length} tasks completed 💝
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
