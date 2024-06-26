"use client";

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<any[]>([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/authors');
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
    {authors.map((author) => (
      <div key={author._id} className="w-full md:w-1/3 p-4 mb-4 bg-white rounded-lg shadow-md">
        <img
          className="w-full h-40 object-cover rounded-t-lg"
          src={author.avatarUrl}
          alt={author.name}
        />
        <div className="p-4">
          <h2 className="text-xl font-bold">{author.name}</h2>
          <p className="text-gray-700">{author.bio}</p>
        </div>
        <Link href={'/authors/' + author._id}>More about me here</Link>
      </div>
    ))}
  </div>
  );
}


