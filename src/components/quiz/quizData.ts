export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which chamber of the heart receives oxygenated blood from the lungs?",
    options: [
      "Right atrium",
      "Left atrium",
      "Right ventricle",
      "Left ventricle"
    ],
    correctAnswer: 1,
    explanation: "The left atrium receives oxygenated blood from the lungs via the pulmonary veins. This blood is then pumped into the left ventricle, which sends it out to the body."
  },
  {
    id: 2,
    question: "What is the function of the mitral valve?",
    options: [
      "Controls blood flow between the left atrium and left ventricle",
      "Controls blood flow between the right atrium and right ventricle",
      "Controls blood flow from the left ventricle to the aorta",
      "Controls blood flow from the right ventricle to the pulmonary artery"
    ],
    correctAnswer: 0,
    explanation: "The mitral valve (also called the bicuspid valve) controls blood flow between the left atrium and left ventricle. It prevents backflow of blood into the left atrium when the left ventricle contracts."
  },
  {
    id: 3,
    question: "Which of the following is NOT a layer of the heart wall?",
    options: [
      "Epicardium",
      "Myocardium",
      "Endocardium",
      "Pericardium"
    ],
    correctAnswer: 3,
    explanation: "The heart wall consists of three layers: the epicardium (outer layer), myocardium (middle, muscular layer), and endocardium (inner layer). The pericardium is a sac that surrounds the heart but is not part of the heart wall itself."
  },
  {
    id: 4,
    question: "What is the normal resting heart rate for adults?",
    options: [
      "40-50 beats per minute",
      "60-100 beats per minute",
      "100-120 beats per minute",
      "120-160 beats per minute"
    ],
    correctAnswer: 1,
    explanation: "A normal resting heart rate for adults ranges from 60 to 100 beats per minute. Athletes and people who are physically fit may have lower resting heart rates, sometimes as low as 40 beats per minute."
  },
  {
    id: 5,
    question: "Which blood vessels carry blood away from the heart?",
    options: [
      "Veins",
      "Capillaries",
      "Arteries",
      "Venules"
    ],
    correctAnswer: 2,
    explanation: "Arteries carry blood away from the heart to the body's tissues. Veins return blood to the heart. The pulmonary artery is unique because it carries deoxygenated blood, but it's still classified as an artery because it carries blood away from the heart."
  },
  {
    id: 6,
    question: "Where is the sinoatrial (SA) node located?",
    options: [
      "Left ventricle",
      "Right ventricle",
      "Left atrium",
      "Right atrium"
    ],
    correctAnswer: 3,
    explanation: "The sinoatrial (SA) node, also known as the heart's natural pacemaker, is located in the upper wall of the right atrium. It generates electrical impulses that initiate each heartbeat."
  },
  {
    id: 7,
    question: "What is cardiac output?",
    options: [
      "The amount of blood pumped by each ventricle per minute",
      "The amount of blood pumped by the heart per beat",
      "The pressure of blood in the arteries",
      "The rate at which the heart beats"
    ],
    correctAnswer: 0,
    explanation: "Cardiac output is the amount of blood pumped by each ventricle per minute. It is calculated by multiplying the stroke volume (amount of blood pumped per beat) by the heart rate (number of beats per minute)."
  },
  {
    id: 8,
    question: "Which of the following is a symptom of heart failure?",
    options: [
      "Increased energy levels",
      "Shortness of breath",
      "Decreased heart rate",
      "Lower blood pressure"
    ],
    correctAnswer: 1,
    explanation: "Shortness of breath (dyspnea) is a common symptom of heart failure, especially during physical activity or when lying down. Other symptoms include fatigue, swelling in the legs, ankles, and feet, and rapid or irregular heartbeat."
  },
  {
    id: 9,
    question: "What is the function of coronary arteries?",
    options: [
      "To carry deoxygenated blood to the lungs",
      "To carry oxygenated blood to the heart muscle",
      "To carry deoxygenated blood back to the heart",
      "To regulate blood pressure"
    ],
    correctAnswer: 1,
    explanation: "Coronary arteries supply oxygenated blood to the heart muscle (myocardium). Blockage of these arteries can lead to coronary artery disease and heart attacks."
  },
  {
    id: 10,
    question: "Which heart valve has only two cusps (flaps)?",
    options: [
      "Tricuspid valve",
      "Pulmonary valve",
      "Aortic valve",
      "Mitral valve"
    ],
    correctAnswer: 3,
    explanation: "The mitral valve (bicuspid valve) has only two cusps or flaps. The other heart valves—tricuspid, pulmonary, and aortic—all have three cusps."
  }
]; 