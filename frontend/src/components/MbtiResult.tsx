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

export const MbtiResult = ({ mbti }: { mbti: string }) => {
  switch(mbti) {
    case 'ENFJ': return <img src={ENFJ} />
    case 'ENFP': return <img src={ENFP} />
    case 'ENTJ': return <img src={ENTJ} />
    case 'ENTP': return <img src={ENTP} />
    case 'ESFJ': return <img src={ESFJ} />
    case 'ESFP': return <img src={ESFP} />
    case 'ESTJ': return <img src={ESTJ} />
    case 'ESTP': return <img src={ESTP} />
    case 'INFJ': return <img src={INFJ} />
    case 'INFP': return <img src={INFP} />
    case 'INTJ': return <img src={INTJ} />
    case 'INTP': return <img src={INTP} />
    case 'ISFP': return <img src={ISFP} />
    case 'ISFJ': return <img src={ISFJ} />
    case 'ISTJ': return <img src={ISTJ} />
    case 'ISTP': return <img src={ISTP} />
  }
  return null;
}