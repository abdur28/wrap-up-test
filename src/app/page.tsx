import BlurredText from "@/components/BlurredText"
import FeaturedProducts from "@/components/FeaturedProducts"
import Hero from "@/components/Hero"
import ProductList from "@/components/ProductList"
import Services from "@/components/Services"
import SingleFaq from "@/components/SIngleFaq"
import Testimonials from "@/components/Testimonials"

const HomePage = () => {
  const faqs = [
    {
      question: "What is Wrap Up?",
      answer: "Wrap Up is a platform that offers a range of services, including styling, makeup, hair, and makeup. "
    },
    {
      question: "How can I use Wrap Up?",
      answer: "Wrap Up is a platform that offers a range of services, including styling, makeup, hair, and makeup. "
    }, 
    {
      question: "What is Wrap Up?",
      answer: "Wrap Up is a platform that offers a range of services, including styling, makeup, hair, and makeup. "
    },
    {
      question: "What is Wrap Up?",
      answer: "Wrap Up is a platform that offers a range of services, including styling, makeup, hair, and makeup. "
    },
    {
      question: "What is Wrap Up?",
      answer: "Wrap Up is a platform that offers a range of services, including styling, makeup, hair, and makeup. "
    }

  ]
  return (
    <div className='w-screen overflow-hidden'>
      <Hero />
      <div className="h-[calc(100vh-0px)] flex justify-center items-center flex-col">
        <BlurredText text="At Wrap Up, we redefine elegance and sophistication. Our mission is to elevate your brand through exquisite styling and meticulous attention to detail. Step into a world where style meets substance, and watch your brand transform to new heights." />
        <button className="mt-10 rounded-2xl ring-1 ring-primary text-primary w-max py-2 px-4 text-lg hover:bg-primary hover:text-white">
            Button
        </button>
      </div>  
      <Services />
      <FeaturedProducts />
      <Testimonials />
      <div className="h-[calc(100vh-0px)] mt-10 flex flex-col  items-center">
        <div className="rounded-2xl border-2 w-20 h-8 text-sm flex justify-center items-center">
            FAQS
        </div>
        <div className="flex flex-col items-center gap-5 mt-10">
          {faqs.map((faq, idx) => (
            <SingleFaq key={idx} faqs={faq} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage