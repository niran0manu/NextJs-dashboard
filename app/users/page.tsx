"use client";

import React, { useEffect, useState } from 'react'
import axios from 'axios'


const UsersPage = () => {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users')
        setUsers(response.data)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <h1>The list of All users</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user._id}>{user.username}--- {user.email}</li>
        ))}
      </ul>
    </div>
  )
}

export default UsersPage

