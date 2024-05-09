import * as React from "react";
import 'react-slideshow-image/dist/styles.css'
import anxiety from "../assets/anxiety.png";
import breathe from "../assets/breathe.png";
import hopeless from "../assets/hopeless.png";
import mentalhealthb from "../assets/mentalhealthblack.png";
import mentalhealthm from "../assets/mentalhealthmatters.png";
import mentalhealthw from "../assets/mentalhealthwhite.png";
import yougotit from "../assets/yougotthis.png";
import therapist from "../assets/therapy2.png";
import therapy from "../assets/therapy.png";
import dontpanic from "../assets/dontpanic.png";
import hearingvoices from "../assets/hearingvoices.png";
import selfarm from "../assets/selfarm.png";
import Marquee from "react-fast-marquee";




function Slidepics() {

    
      
      const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '200px',
        width: '500px'
      }
      

      const pics =  [ mentalhealthw, therapist, breathe, hopeless, mentalhealthb, yougotit, selfarm,
        mentalhealthm, therapy, dontpanic, hearingvoices, anxiety ]


     return (

      <div className="slide-container w-80">
        <Marquee play={true} speed={250} delay={0} loop={1000} onFinish={null}>
         {pics.map((pics, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${pics})` }} >
              </div>
            </div>
          ))} 
        </Marquee>
      </div>

    );
}
export default Slidepics