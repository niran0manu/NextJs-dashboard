import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
  return (
    <main><h1>hello</h1>
    
    <Link href="/users">Users here</Link>
    <br></br>
    <Link href="/authors">authors here</Link>
    </main>
  )
}
