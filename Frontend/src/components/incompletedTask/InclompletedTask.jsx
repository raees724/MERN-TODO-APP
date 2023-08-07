import React, { useEffect, useState } from 'react'
import { incompletedTasks } from '../../api/endpoints';
import Nodata from '../Nodata';

const InclompletedTask = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      incompletedTasks()
        .then((data) => {
          setTasks(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);
  
    return (
      <div className="text-white bg-stone-600 h-screen">
        <h2 className='text-xl m-2'>Incompleted Tasks</h2>
        {
            tasks?.length > 0 ?
            <div className="mx-auto p-4">
          {tasks.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center p-4 border border-gray-300 rounded-md mb-4"
            >
              <div className="">
                <h4 className="font-semibold">{todo.title}</h4>
                <p className="text-gray-400">{todo.description}</p>
              </div>
            </div>
          ))}
        </div>
        :
        <Nodata/>

        }
        
      </div>
    );
  };

export default InclompletedTask