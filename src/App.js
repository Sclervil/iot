import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";



function App() {
    const base_url = 'https://www.opencve.io/api/'
    const [vendor, setVendor] = useState(null)
    const [product, setProduct] = useState(null)
    
    //Enlever le commentaire pour ces trois lignes
    //const [vendors, setVendors] = useState([])
    //const [products, setProducts] = useState([])
    //const [CVEs, setCVEs] = useState([])

    //Supprimez ces lignes
    const [vendors, setVendors] = useState([{ name: '*', human_name: '*' },
    { name: '-', human_name: '-' },
    { name: '$0.99_kindle_books_project', human_name: '$0.99 Kindle Books Project' },
    { name: '01generator', human_name: '01generator' },
    { name: '01-scripts', human_name: '01-scripts' },
    { name: '07fly', human_name: '07fly' },
    { name: '0branch', human_name: '0branch' },
    { name: '0kims', human_name: '0kims' },
    { name: '0mk_shortener_project', human_name: '0mk Shortener Project' },
    { name: '0verkill', human_name: '0verkill' }])
    const [products, setProducts] = useState([{ name: 'adserve', human_name: 'Adserve' },
    { name: 'alert_before_you_post', human_name: 'Alert Before You Post' },
    { name: 'blix', human_name: 'Blix' },
    { name: 'blixed', human_name: 'Blixed' },
    { name: 'blixkrieg', human_name: 'Blixkrieg' },
    { name: 'blogger_importer', human_name: 'Blogger Importer' }])
    const [CVEs, setCVEs] = useState([ {
      "id": "CVE-2023-39999",
      "summary": "Exposure of Sensitive Information to an Unauthorized Actor in WordPress from 6.3 through 6.3.1, from 6.2 through 6.2.2, from 6.1 through 6.13, from 6.0 through 6.0.5, from 5.9 through 5.9.7, from 5.8 through 5.8.7, from 5.7 through 5.7.9, from 5.6 through 5.6.11, from 5.5 through 5.5.12, from 5.4 through 5.4.13, from 5.3 through 5.3.15, from 5.2 through 5.2.18, from 5.1 through 5.1.16, from 5.0 through 5.0.19, from 4.9 through 4.9.23, from 4.8 through 4.8.22, from 4.7 through 4.7.26, from 4.6 through 4.6.26, from 4.5 through 4.5.29, from 4.4 through 4.4.30, from 4.3 through 4.3.31, from 4.2 through 4.2.35, from 4.1 through 4.1.38.",
      "created_at": "2023-10-13T12:15:00Z",
      "updated_at": "2024-02-16T17:16:07Z"
  },
  {
      "id": "CVE-2016-10033",
      "summary": "The mailSend function in the isMail transport in PHPMailer before 5.2.18 might allow remote attackers to pass extra parameters to the mail command and consequently execute arbitrary code via a \\\" (backslash double quote) in a crafted Sender property.",
      "created_at": "2016-12-30T19:59:00Z",
      "updated_at": "2024-02-14T14:56:08Z"
  },
  {
      "id": "CVE-2011-3861",
      "summary": "Cross-site scripting (XSS) vulnerability in the Web Minimalist 200901 theme before 1.2 for WordPress allows remote attackers to inject arbitrary web script or HTML via the PATH_INFO to index.php.",
      "created_at": "2011-09-28T10:55:00Z",
      "updated_at": "2024-02-14T01:17:43Z"
  },
  {
      "id": "CVE-2011-4562",
      "summary": "Multiple cross-site scripting (XSS) vulnerabilities in (1) view/admin/log_item.php and (2) view/admin/log_item_details.php in the Redirection plugin 2.2.9 for WordPress allow remote attackers to inject arbitrary web script or HTML via the Referer HTTP header in a request to a post that does not exist.",
      "created_at": "2011-11-28T21:55:00Z",
      "updated_at": "2024-02-14T01:17:43Z"
  },
  {
      "id": "CVE-2011-4342",
      "summary": "PHP remote file inclusion vulnerability in wp_xml_export.php in the BackWPup plugin before 1.7.2 for WordPress allows remote attackers to execute arbitrary PHP code via a URL in the wpabs parameter.",
      "created_at": "2012-10-08T18:55:00Z",
      "updated_at": "2024-02-14T01:17:43Z"
  },
  {
      "id": "CVE-2011-3857",
      "summary": "Cross-site scripting (XSS) vulnerability in the Antisnews theme before 1.10 for WordPress allows remote attackers to inject arbitrary web script or HTML via the s parameter.",
      "created_at": "2011-09-28T10:55:00Z",
      "updated_at": "2024-02-14T01:17:43Z"
  },
  {
      "id": "CVE-2011-3853",
      "summary": "Cross-site scripting (XSS) vulnerability in the Hybrid theme before 0.10 for WordPress allows remote attackers to inject arbitrary web script or HTML via the cpage parameter.",
      "created_at": "2011-09-28T10:55:00Z",
      "updated_at": "2024-02-14T01:17:43Z"
  },
  {
      "id": "CVE-2011-3860",
      "summary": "Cross-site scripting (XSS) vulnerability in the Cover WP theme before 1.6.6 for WordPress allows remote attackers to inject arbitrary web script or HTML via the s parameter.",
      "created_at": "2011-09-28T10:55:00Z",
      "updated_at": "2024-02-14T01:17:43Z"
  }])
  //Jusque la

  const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      summary: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      created_at: { value: null, matchMode: FilterMatchMode.DATE_IS },
      updated_at: { value: null, matchMode: FilterMatchMode.DATE_IS }
  });
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const navigate = useNavigate();
  if (!localStorage.getItem('loggedIn')) {
    navigate('/');
  }

  function handleVendorChange(e){
    setVendor(e.value)
    setProduct(null)
    setProducts([])
    if(e.value !== null){
      //Chargez les produits ici
      //fetch(base_url + 'vendors/products?' + 'vendorName=' + e.value).then((res) => setProducts(res.json()))
    }
    
  }

  function handleProductChange(e){
    setProduct(e.value)
    setCVEs([])
    if(e.value !== null){
      //Chargez les CVE ici
      //fetch(base_url + 'products/cve?' + 'vendorName=' + vendor.name + '&productName=' + e.value).then((res) => setCVEs(res.json()))
    }
    
  }

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

  useEffect(() => {
    //Charger la liste des vendeurs ici
  }, []);

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="w-80">
        <h1 className="text-center">Plateforme de Gestion des Vulnérabilités Pour les Objets Connectés (IOT)</h1>
        <div>
          <h4>Vendeur</h4>
          <Dropdown
          style={{ backgroundColor: 'var(--primary-color)', color: 'var(--primary-color-text)', borderRadius: 'var(--border-radius)' }}
          severity="info"
          className="w-20"
          optionLabel="human_name"
          optionValue="name"
          value={vendor}
          options={vendors}
          onChange={handleVendorChange}
          placeholder="Choisir un vendeur"
          showClear
          filter
        />
        </div>
        <div>
          <h4>Produit</h4>
          <Dropdown
          style={{ backgroundColor: 'var(--primary-color)', color: 'var(--primary-color-text)', borderRadius: 'var(--border-radius)' }}
          className="w-20"
          optionLabel="human_name"
          optionValue="name"
          value={product}
          options={products}
          onChange={handleProductChange}
          placeholder="Choisir un produit"
          disabled={!vendor}
          showClear
          filter
        />
        </div>
        {vendor && product && (
                    <div>
                        <h3>CVE ({CVEs.length})</h3>
                        <DataTable value={CVEs} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                  globalFilterFields={['id', 'summary', 'created_at', 'updated_at']} header={header} emptyMessage="No data found.">
                            <Column field="id" header="ID" filter filterPlaceholder="Recherche"></Column>
                            <Column field="summary" header="Résumé" filter filterPlaceholder="Recherche "></Column>
                            <Column field="created_at" header="Date de création" filter filterPlaceholder="Recherche"></Column>
                            <Column field="updated_at" header="Date de mise à jour" filter filterPlaceholder="Recherche"></Column>
                        </DataTable>
                    </div>
                )}
      </div>
    </div>
  );
}

export default App;
