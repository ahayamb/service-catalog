import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Tag } from 'primereact/tag';
import { useEffect, useState } from "react";

export default function ServiceCatalog() {
  const [services, setServices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [lastUpdate, setLastUpdate] = useState(null);
  const [statuses] = useState(['online', 'offline']);

  const getPlatformColor = (platform) => {
    if (platform === "web") return "primary";
    if (platform === "android") return "success";
    if (platform === "ios") return "danger";
  }

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={rowData.status === "online" ? "success" : "danger"} />
    );
  }

  const nameBodyTemplate = (rowData) => {
    return (
      <>
      {
        rowData.app.platform.map((x) => (
          <Tag value={x} severity={getPlatformColor(x)} style={{marginRight: '3px'}}/>
        ))
      }
      <p>{rowData.app.name}</p>
      </>
    )
  }

  const columns = [
    { field: "pic", header: "Pengelola", filter: true, width: '10%' },
    { field: "app.appType", header: "Jenis", filter: true, width: '10%' },
    { field: "app.targetUser", header: "Target Pengguna", filter: true, width: '12%' },
    { field: "description", header: "Deskripsi", filter: true, width: '25%' },
    { field: "notes", header: "Keterangan", filter: true, width: '10%' },
  ];
  const [visibleColumns, setVisibleColumns] = useState(columns);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    notes: { value: null, matchMode: FilterMatchMode.CONTAINS },
    pic: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.IN },
    'app.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'app.targetUser': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'app.appType': { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) => selectedColumns.some((sCol) => sCol.field === col.field));

    setVisibleColumns(orderedSelectedColumns);
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={option === "online" ? "success" : "danger"} />;
  };

  const statusFilterTemplate = (options) => {
    return (
      <MultiSelect
          value={options.value}
          options={statuses}
          itemTemplate={statusItemTemplate}
          onChange={(e) => options.filterApplyCallback(e.value)}
          className="p-column-filter"
          maxSelectedLabels={1}
          style={{ minWidth: '5rem' }}
      />
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left" style={{marginRight: '3px'}}>
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Cari Layanan"
          />
        </span>
        <MultiSelect value={visibleColumns} options={columns} optionLabel="header" onChange={onColumnToggle} className="w-full sm:w-20rem" display="chip" />
      </div>
    );
  };

  useEffect(() => {
    const req = async () => {
      let url = "https://service-catalog.bojonegorokab.my.id/api/data";
      const res = await fetch(url);
      return res.json();
    }
    
    req().then((data) => {
      setServices(data.map((x) => ({...x, key: x.id})));
      setLastUpdate(data[0].lastUpdate);
      setIsLoading(false);
    });
  }, []);
  
  const header = renderHeader();

  return (
    <>
      <div style={{marginBottom: '5px'}}>Update terakhir: {lastUpdate}</div>
      <div className="card">
        <DataTable
          value={services}
          paginator
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          rows={10}
          dataKey="id"
          filters={filters}
          filterDisplay="row"
          loading={isLoading}
          header={header}
          emptyMessage="Layanan tidak ditemukan."
          rowsPerPageOptions={[5, 10, 25, 50]}
          showGridlines
        >
          <Column
            field="app.name"
            header="Nama Layanan"
            body={nameBodyTemplate}
            style={{ width: '20%' }}
            filter
          />
          <Column
            header="Status"
            body={statusBodyTemplate}
            style={{ width: '1%' }}
            bodyClassName="text-center"
            filter
            filterElement={statusFilterTemplate}
            filterField="status"
            showFilterMenu={false}
            filterMenuStyle={{ width: '5rem' }}
          />
          {
            visibleColumns.map((col) => (
              <Column 
                field={col.field} 
                header={col.header} 
                body={col.body}
                filter={col.filter} 
                style={{ width: col.width }}
                showFilterMenu={false}
              />
              )
            )
          }
        </DataTable>
      </div>
    </>
  )
};
