
import MainButton from "@/component/mainButton"

export default function Page(){
  return(
    <main className="min-h-100vh">
      <h1>Welcome to my blogging page</h1>
      <p>This is a sample blog post</p>
      <MainButton/>
      <form>
        <input type="text" placeholder="Enter your name"/>
      </form>
    </main>
    
  )
}