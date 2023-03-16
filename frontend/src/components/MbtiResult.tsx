import ENFJ from "images/mbti/ENFJ.png"
import ENFP from "images/mbti/ENFP.png"
import ENTJ from "images/mbti/ENTJ.png"
import ENTP from "images/mbti/ENTP.png"
import ESFJ from "images/mbti/ESFJ.png"
import ESFP from "images/mbti/ESFP.png"
import ESTJ from "images/mbti/ESTJ.png"
import ESTP from "images/mbti/ESTP.png"
import INFJ from "images/mbti/INFJ.png"
import INFP from "images/mbti/INFP.png"
import INTJ from "images/mbti/INTJ.png"
import INTP from "images/mbti/INTP.png"
import ISFP from "images/mbti/ISFP.png"
import ISFJ from "images/mbti/ISFJ.png"
import ISTJ from "images/mbti/ISTJ.png"
import ISTP from "images/mbti/ISTP.png"

type PropsType = {
  mbti : string
  width? : string;
};

export const MbtiResult = (props : PropsType) => {
  const mbti = props.mbti; 
  const defaultWidth = "450px";
  const final_width = props.width == undefined ? defaultWidth : props.width;
  console.log(props.width)
  switch(mbti) {
    case 'ENFJ': return <img src={ENFJ} width={final_width} />
    case 'ENFP': return <img src={ENFP} width={final_width} />
    case 'ENTJ': return <img src={ENTJ} width={final_width} />
    case 'ENTP': return <img src={ENTP} width={final_width} />
    case 'ESFJ': return <img src={ESFJ} width={final_width} />
    case 'ESFP': return <img src={ESFP} width={final_width} />
    case 'ESTJ': return <img src={ESTJ} width={final_width} />
    case 'ESTP': return <img src={ESTP} width={final_width} />
    case 'INFJ': return <img src={INFJ} width={final_width} />
    case 'INFP': return <img src={INFP} width={final_width} />
    case 'INTJ': return <img src={INTJ} width={final_width} />
    case 'INTP': return <img src={INTP} width={final_width} />
    case 'ISFP': return <img src={ISFP} width={final_width} />
    case 'ISFJ': return <img src={ISFJ} width={final_width} />
    case 'ISTJ': return <img src={ISTJ} width={final_width} />
    case 'ISTP': return <img src={ISTP} width={final_width} />
  }
  return null;
}