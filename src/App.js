import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { ProblemService } from './service/ProblemService';
import { useNavigate } from 'react-router-dom';     
import axios from 'axios';



function App() {
    const base_url = 'https://www.opencve.io/api/'
    const [vendor, setVendor] = useState(null)
    const [product, setProduct] = useState(null)
    const [vendors, setVendors] = useState([])
    const [products, setProducts] = useState([])
    const [CVEs, setCVEs] = useState([])

  const [problems, setProblems] = useState(null);
  const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      Cve: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      Cwe: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      Vendor: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      Products: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const navigate = useNavigate();
  if (!localStorage.getItem('loggedIn')) {
    navigate('/');
  }

  function handleVendorChange(e){
    setProducts([])
    fetch(base_url + 'vendors/products?' + 'vendorName=' + e.value).then((res) => setProducts(res.json()))
  }

  function handleProductChange(e){
    fetch(base_url + 'products/cve?' + 'vendorName=' + vendor.name + '&productName=' + e.value).then((res) => setCVEs(res.json()))
  }

  

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get(base_url + 'vendors/', {
            auth: {
              username: 'sclervil',
              password: '4Csx5R@!EZr8G#H'
            }
          });
          setVendors(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();

  }, []);


  const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      let _filters = { ...filters };

      _filters['global'].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
  };

  const renderHeader = () => {
      return (
          <div className="flex justify-content-end">
              <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
              </span>
          </div>
      );
  };

  const header = renderHeader();

  return (
    <div className="card flex justify-content-center">
            
    </div>
  );
}

export default App;
