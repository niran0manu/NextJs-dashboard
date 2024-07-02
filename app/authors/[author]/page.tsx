// app/authors/[author]/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuthorPage = ({ params }: { params: { author: string } }) => {
  const [author, setAuthor] = useState<any>(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(`/api/authors/${params.author}`);
        console.log(response.data); // Log the entire response data
        setAuthor(response.data.author); // Set author to response.data.author
      } catch (error) {
        console.error('Error fetching author data:', error);
      }
    };

    fetchAuthor();
  }, [params.author]);

  return (
    <div>
      <h1>Author:</h1>
      {author && (
        <div>
          <h1>{author.name}</h1>
          <p>{author.bio}</p>
          {/* <img src={author.avatarUrl} alt={author.name} /> */}
        </div>
      )}
    </div>
  );
};

export default AuthorPage;
