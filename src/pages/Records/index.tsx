import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import { RecordResponse } from './types'
import { formatDate } from './helpers';
import Pagination from './pagination';
import Filter from '../../components/Filters';

const BASE_URL = 'https://webdevbrasil.herokuapp.com';

const Records = () => {

    const [recordRespose, setrecordRespose] = useState<RecordResponse>();

    console.log(recordRespose);
    const [activePage,setActivePage] = useState(0);

    useEffect(() => {
        axios.get(`${BASE_URL}/records?linesPerPage=12`)
        .then(response => setrecordRespose(response.data))
    }, [activePage])

    const handlePageChange = (index: number) => {
        setActivePage(index);
    }

    return (
        <div className="page-container">
            <Filter link="/charts" linkText="VER GRÁFICOS"/>
            <table className="records-table" cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th>INSTANTE</th>
                        <th>NOME</th>
                        <th>IDADE</th>
                        <th>PLATFORMA</th>
                        <th>GÊNERO</th>
                        <th>TÍTULO DO GAME</th>
                    </tr>
                </thead>
                <tbody>
                    {recordRespose?.content.map(record =>(
                        <tr key={record.id}>
                            <td>{formatDate(record.moment)}</td>
                            <td>{record.name}</td>
                            <td>{record.age}</td>
                            <td className="text-secondary">{record.platform}</td>
                            <td>{record.genreName}</td>
                            <td className="text-primary">{record.gameTitle}</td>
                        </tr>
                    ))}
    
                </tbody>
            </table>
            <Pagination 
                activePage={activePage}
                goToPage={handlePageChange}
                totalPages={recordRespose?.totalPages}
            />
        </div>
    );
}


export default Records
