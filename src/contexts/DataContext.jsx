import React, { createContext, useContext, useState, useEffect } from 'react';
import rawData from '../data.json';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    useEffect(() => {
        // Process data if needed
        const students = rawData.perStudent;
        const studentIds = Object.keys(students);

        if (studentIds.length > 0) {
            setSelectedStudentId(studentIds[0]);
        }

        setData(students);
        setLoading(false);
    }, []);

    const getStudent = (id) => data ? data[id] : null;

    return (
        <DataContext.Provider value={{
            allData: data,
            loading,
            selectedStudentId,
            setSelectedStudentId,
            currentStudent: selectedStudentId ? getStudent(selectedStudentId) : null
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
