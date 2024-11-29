export const metadata = {
  title: {
    default : 'Nandani Koli - MemberShipSite',
    template : '%s',
  },
  description: 'this is the portfolio website created using NextJS',
}
// database connect 
import connectToDatabase from '@/utils/config';
connectToDatabase();

export default function MemberLayout({ children }) {

  return (
   <div>
    {children}
   </div>  
  )
}
