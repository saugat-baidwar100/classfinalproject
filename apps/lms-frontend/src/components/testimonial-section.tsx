import { Star } from 'lucide-react'
import testimonialImage from '../assets/images/testimonial.png'

export default function TestimonialSection() {
 return (
   <div className="w-full px-4 py-12">
     <div className="mx-auto max-w-3xl text-center">
       <h2 className="text-[32px] font-semibold text-zinc-900 mb-2">
         Students Testimonial
       </h2>
       <p className="text-zinc-500 text-lg mb-16">
         See what others are achieving from our courses
       </p>
       
       <div className="relative">
         <div className="bg-[#3CC5A7] rounded-[20px] text-white relative overflow-visible p-8 pt-12">
           <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
             <div className="rounded-full border-4 border-white overflow-hidden w-24 h-24">
               <img
                 src={testimonialImage}
                 alt="Student profile"
                 className="w-full h-full object-cover"
               />
             </div>
           </div>
           
           <div className="max-w-2xl mx-auto">
             <div className="text-[80px] leading-none font-serif text-white/90 mb-4">"</div>
             <p className="text-lg leading-relaxed mb-8">
               "This platform transformed my career! The courses are so well-structured and easy to follow. 
               Highly recommend it to anyone looking to upskill. The courses are so well-structured and easy to follow. 
               This platform transformed my career! The courses are so well-structured and easy to follow. 
               Highly recommend it to anyone looking to upskill"
             </p>
             
             <div className="space-y-1">
               <h3 className="text-2xl font-semibold">Albert Flores</h3>
               <p className="text-white/90 mb-3">Student</p>
               <div className="flex justify-center gap-1">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} className="w-6 h-6 fill-yellow-400 stroke-yellow-400" />
                 ))}
               </div>
             </div>
           </div>
         </div>
         
         <div className="flex justify-center gap-2 mt-6">
           {[...Array(3)].map((_, i) => (
             <button
               key={i}
               className={`w-2 h-2 rounded-full transition-colors ${
                 i === 0 ? "bg-[#3CC5A7]" : "bg-[#3CC5A7]/20"
               }`}
               aria-label={`Go to slide ${i + 1}`}
             />
           ))}
         </div>
       </div>
     </div>
   </div>
 )
}