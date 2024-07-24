import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <nav className="flex justify-between items-center mb-8 p-4 bg-gray-100 rounded-lg">
        <h1 className="text-2xl font-bold">NewsLetter<span className='text-red-500'>Hub</span></h1>
        <div className="flex items-center space-x-4">
          <input 
            type="text" 
            placeholder="Search..." 
            className="px-4 py-2 border rounded-lg text-gray-600"
          />
          <Link href="/login" className="text-gray-600">
            Login
          </Link>
          <Link href="/signup" className="text-gray-600">
            Sign Up
          </Link>
        </div>
        
      </nav>
      <hr></hr>
   
      <main>
        <h1>hello</h1>
        <Link href="/users">Users here</Link>
        <br />
        <Link href="/authors">Authors here</Link>
      </main>
    </div>
  );
}