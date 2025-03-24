import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [],
    currentPost: null,
    categories: new Set(),
    tags: new Set()
  }),
  
  actions: {
    addPost(post) {
      const newPost = {
        id: Date.now(),
        ...post,
        createdAt: new Date().toISOString(),
        categories: post.categories || [],
        tags: post.tags || []
      }
      
      this.posts.push(newPost)
      
      // 更新分类和标签集合
      newPost.categories.forEach(category => this.categories.add(category))
      newPost.tags.forEach(tag => this.tags.add(tag))
      
      this.savePosts()
    },
    
    updatePost(id, updatedPost) {
      const index = this.posts.findIndex(post => post.id === id)
      if (index !== -1) {
        const oldPost = this.posts[index]
        
        // 更新分类和标签集合
        oldPost.categories.forEach(category => this.categories.delete(category))
        oldPost.tags.forEach(tag => this.tags.delete(tag))
        
        updatedPost.categories = updatedPost.categories || []
        updatedPost.tags = updatedPost.tags || []
        
        updatedPost.categories.forEach(category => this.categories.add(category))
        updatedPost.tags.forEach(tag => this.tags.add(tag))
        
        this.posts[index] = { ...this.posts[index], ...updatedPost }
        this.savePosts()
      }
    },
    
    deletePost(id) {
      const post = this.posts.find(p => p.id === id)
      if (post) {
        post.categories.forEach(category => this.categories.delete(category))
        post.tags.forEach(tag => this.tags.delete(tag))
        this.posts = this.posts.filter(p => p.id !== id)
        this.savePosts()
      }
    },
    
    setCurrentPost(post) {
      this.currentPost = post
    },
    
    savePosts() {
      localStorage.setItem('blog-posts', JSON.stringify(this.posts))
      localStorage.setItem('blog-categories', JSON.stringify([...this.categories]))
      localStorage.setItem('blog-tags', JSON.stringify([...this.tags]))
    },
    
    loadPosts() {
      const savedPosts = localStorage.getItem('blog-posts')
      const savedCategories = localStorage.getItem('blog-categories')
      const savedTags = localStorage.getItem('blog-tags')
      
      if (savedPosts) {
        this.posts = JSON.parse(savedPosts)
      }
      
      if (savedCategories) {
        this.categories = new Set(JSON.parse(savedCategories))
      }
      
      if (savedTags) {
        this.tags = new Set(JSON.parse(savedTags))
      }
    },
    
    getPostsByCategory(category) {
      return this.posts.filter(post => post.categories.includes(category))
    },
    
    getPostsByTag(tag) {
      return this.posts.filter(post => post.tags.includes(tag))
    }
  },
  
  getters: {
    getPostById: (state) => (id) => {
      return state.posts.find(post => post.id === parseInt(id))
    },
    
    sortedPosts: (state) => {
      return [...state.posts].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      )
    }
  }
}) 