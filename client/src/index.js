import React from 'react';
import ReactDOM from 'react-dom/client';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';                                   // css utility
import './index.css';
import './flags.css';
import ServiceCatalog from './service-catalog';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* <DataTableDemo/> */}
        <ServiceCatalog />
        {/* <Demo/> */}
    </React.StrictMode>
);
