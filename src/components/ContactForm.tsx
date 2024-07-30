'use client'

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./contactForm.scss";
import Alert from "./Alert";
import { useAlert } from "@/hooks/useAlert";
import { sendEmail } from "@/lib/action";
import { useFormState } from "react-dom";




const ContactForm = ({infoAsString}: {infoAsString: string}) => {
    const info = JSON.parse(infoAsString||"{}");
    const [WrapUp, setWrapUp] = useState(true);
    const formRef = useRef<any>();
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const { show, showAlert, hideAlert, text, type } = useAlert();
    const [state, formAction] = useFormState(sendEmail, undefined);
    const [loading, setLoading] = useState(false);
    const toggleSwitch = () => setWrapUp(!WrapUp);
    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
      };


    const sendingEmail = () => {
        showAlert({
            show: true,
            text: "Sending emall...",
            type: "success",
        });
        const formData = new FormData(formRef.current);
        if (WrapUp) {
            formData.append("myEmail", info.wrapUpEmail);
            formData.append("brand", "WrapUp");
        } else {
            formData.append("myEmail", info.servicesEmail);
            formData.append("brand", "Style with Minimaza");
        }
        formData.append("name", form.name); 
        formData.append("email", form.email); 
        formData.append("message", form.message); 
        formAction(formData);
    };

    const handleChange = (e: any): void => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setLoading(true);
        console.log(form)
        sendingEmail()
    };


    useEffect(() => {
        if (state) {
            hideAlert();
            if (state.status === "success"){
                showAlert({
                    text: "Thank you for your message 😃",
                    type: "success",
                    show: true
                });
                setLoading(false);
                setTimeout(() => {
                hideAlert();
                setForm({
                    name: "",
                    email: "",
                    message: "",
                });
                }, 5000);
            
            } else {

                    showAlert({
                        show: true,
                        text: state.message,
                        type: "danger",
                    });
                    setLoading(false);
                    setTimeout(() => {
                    hideAlert();
                    }, 5000);
                    // router.refresh()
            }
        }
    },[state])


    return(
        <div className="flex flex-col justify-center items-center gap-7 mt-10">
          {show && <Alert text={text} type={type} />}
            <div className={`mb-5 bg-white/40 w-[250px] h-[40px] rounded-2xl p-1 flex ${WrapUp ? 'justify-start' : 'justify-end'}`} data-ison={WrapUp} onClick={toggleSwitch}>
                <motion.div className="w-1/2 bg-primary rounded-2xl shadow-gray-600 shadow-sm flex justify-center items-center" layout transition={spring} >
                    <motion.p className="text-black text-sm font-Satoshi text-center">
                        {WrapUp ? 'Wrap Up' : 'Services'}
                    </motion.p>
                </motion.div>
                <div>
              </div>
              <div className="w-[250px] h-[40px]  flex flex-row rounded-2xl p-1 absolute -z-10">
                <p className="text-gray-500 text-sm font-Satoshi text-center w-1/2">Wrap Up</p>
                <p className="text-gray-500 text-sm font-Satoshi text-center w-1/2">Services</p>
              </div>
            </div>
            <h1 className="text-3xl font-Satoshi font-semibold">Get in touch</h1>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className='flex flex-col gap-4 w-full px-10 md:w-[700px]'
            >
              <label className='flex flex-col'>
                <span className='text-black font-Satoshi mb-2  text-sm lg:text-md '>Your Name</span>
                <input
                  type='text'
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your name?"
                  required
                  className='text-black text-sm lg:text-md  md:py-3 md:px-6 py-2 px-4 font-Satoshi placeholder:text-grey rounded-2xl outline-none border-black border-[1px]'
                />
              </label>
              <label className='flex flex-col'>
                <span className='text-black font-Satoshi mb-2 text-sm lg:text-md'>Your email</span>
                <input
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your email address?"
                  required
                  className='text-black text-sm lg:text-md md:py-3 md:px-6 py-2 px-4 font-Satoshi placeholder:text-grey rounded-2xl outline-none border-black border-[1px]'
                />
              </label>
              <label className='flex flex-col'>
                <span className='text-black font-Satoshi mb-2 text-sm lg:text-md'>Your Message</span>
                <textarea
                  rows={5}
                  name='message'
                  value={form.message}
                  onChange={handleChange}
                  placeholder='What you want to say?'
                  required
                  className='text-black text-sm lg:text-md md:py-3 md:px-6 py-2 px-4 font-Satoshi placeholder:text-gray rounded-2xl outline-none border-black border-[1px] font-medium'
                />
              </label>
              
              <div className="flex flex-row gap-5 items-center mt-2">
                
                  
                  <button
                    type='submit'
                    {...(loading ? { disabled: true } : {})}
                    className=' rounded-2xl ring-1 ring-black text-black w-max py-2 md:px-6 px-4 md:text-base text-xs hover:bg-primary hover:text-white'
                  >
                   
                    {loading ? "Sending..." : "Send"}
                  </button>
                  <button className="social-Btn phone-Btn" type="button" onClick={() => window.location.href = `tel:${WrapUp ? info.wrapUpPhoneNumber : info.servicesPhoneNumber}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="1.5em" className="svgIcon"><path d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,8,8.2c-2.384,2.384,5.417,10.185,7.8,7.8a3.877,3.877,0,0,1,1.173-.781,2.092,2.092,0,0,1,2.328.445Z"/></svg>
                    <span className="text text-[0.6rem]">{WrapUp ? info.wrapUpPhoneNumber : info.servicesPhoneNumber}</span>
                  </button>
                  <button className="social-Btn instagram-Btn" type="button" onClick={() => window.location.href = `https://www.instagram/${WrapUp ? info.wrapUpInstagram : info.servicesInstagram}.com`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512" className="svgIcon"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                    <span className="text">Instagram</span>
                  </button>
                  <button className="social-Btn twitter-Btn" type="button" onClick={() => window.location.href = `https://twitter/${WrapUp ? info.wrapUpTwitter : info.servicesTwitter}.com`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 550" className="svgIcon"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
                    <span className="text">Twitter</span>
                  </button>
                
                
              </div>
            </form>
        </div>
        
    )
}

export default ContactForm
