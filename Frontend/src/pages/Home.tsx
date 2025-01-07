import Features from "./HomeComponents/Features"
import Hero from "./HomeComponents/Hero"

const Home = () => {
  return (
    <div className="max-w-[55rem] mx-auto">
        <Hero/>
        <Features/>
    </div>
  )
}

export default Home