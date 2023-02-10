import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
const Hero = () => {
  const [subjects, setSubjects] = useState([
    { grade: 0, units: 0 },

  ]);



  const handleChange = (e, index) => {
    const newSubjects = [...subjects];
    newSubjects[index][e.target.name] = e.target.value;
    setSubjects(newSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { grade: "", units: "" }]);
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };
  

  const calculateGWA = () => {
    let totalUnits = 0;
    let gradeWeight = 0;
  
    subjects.forEach((subject) => {
      gradeWeight += subject.grade * subject.units;
      totalUnits += Number(subject.units);
            
    });
  
    let gwa =  gradeWeight / totalUnits ;
    return gwa;
     
  };
  return (
    <>
    <div className='mx-4 mt-5 h-[100vh] mb-5'> 
    <h1 className='text-center mb-10 font-Poppins'>GENERAL WEIGHTED AVERAGE CALCULATOR</h1>
      <p className='text-center text-gray-400 text-xs sm:text-base'>Disclaimer: This system is specific to Northwestern University students only. The calculation of Grade Point Average (GWA) may differ from one university to another, and this information should not be taken as a standard for other institutions</p>
      <div className='mx-3 sm:mx-0 grid justify-items-center'>
      {subjects.map((subject, index) => (
        <div className=' grid-cols-3 gap-2 w-[100%] sm:w-[50%] content-center flex items-center justify-center' key={index}>
          <label className='font-bold text-lg font-Poppins'>Units
            <input
            type="number"
            name="units"
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            value={subject.units}
            onChange={(e) => handleChange(e, index)}
            placeholder="Units"
          />
          </label>
     

      <label className='font-bold text-lg font-Poppins'>Final Grade
      <input
        type="number"
        name="grade"
        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
        value={subject.grade}
        onChange={(e) => handleChange(e, index)}
        placeholder="Grade"
        step="0.01"
        required
      />
      </label>

      <button className='flex items-center justify-center appearance-none  w-5 text-sm sm:text-sm h-5 bg-gray-200 text-black font-bold border rounded px-2 py-2 leading-tight  focus:bg-white' onClick={() => removeSubject(index)}>X</button>
  
        </div>

    
      ))}

     <button class="font-Poppins flex justify-start my-8 bg-transparent text-gray-600 font-semibold hover:text-black py-2 px-4 border  rounded" onClick={addSubject}>Add Subject</button>
      <p className='font-bold font-Poppins text-lg text-center'>General Weighted Average:  {isNaN(calculateGWA()) ? "Input Grades and Units" : calculateGWA()}</p>

    </div>
    </div>
  
       
    </>
 
  )
}

export default Hero