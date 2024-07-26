import ContactForm from '@/components/ContactForm';
import './contact.scss';
import { getInformation } from '@/lib/data';

const Contact = async () => {
    const info = await getInformation();
    const infoAsString = JSON.stringify(info);
  
    return (
    <div className="w-screen md:h-[100vh] h-[80vh] overflow-hidden">
      <ContactForm infoAsString={infoAsString}/>
    </div>
  )
};  

export default Contact