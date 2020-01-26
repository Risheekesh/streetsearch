import React, { Component } from 'react';
import './App.css';
import TableComponent from './components/table-component';
import MapComponent from './components/map-component';
import { getAllAddress } from './services';

class App extends Component {

  state = {
    tableData: undefined,
    completeData: undefined,
    per_page: 10,
    last_page: '',
    current_page: 1,
    searchQuery: '',
    sortColumn: 'pin_code',
    sortOrder: 'asc',
    loading: false,
    isPagination: false
  };

  componentDidMount() {

    const apiResult = getAllAddress();
    const isPagination = (apiResult && apiResult.length > 10) ? true : false;
    const last_page = Math.floor(apiResult / this.state.per_page);

    let tableData = [...apiResult];
    if (tableData.length > 10) { tableData.length = 10 }
    this.setState({
      tableData: tableData,
      completeData: apiResult,
      isPagination: isPagination,
      last_page: last_page
    })

  }


  pagination = (target, e, i = null) => {
    // e.preventDefault();
    this.setState({
      loading: true
    });
    switch (target) {
      case 'pre':
        if (this.state.current_page !== 1) {
          const current_page = this.state.current_page - 1;
          const startOfRecord = (this.state.per_page * (current_page - 1));
          const tableData = this.state.completeData.slice(startOfRecord, (this.state.per_page * current_page));
          this.setState({
            tableData: tableData,
            current_page: current_page
          })
        }
        break;
      case 'next':
        if (this.state.current_page !== this.state.last_page) {
          const current_page = this.state.current_page + 1;
          const startOfRecord = (this.state.per_page * (current_page - 1));
          const tableData = this.state.completeData.slice(startOfRecord, (this.state.per_page * (current_page)));
          this.setState({
            tableData: tableData,
            current_page: current_page
          })
        }
        break;
      default:

        break;

    }
    this.setState({
      loading: false
    });
  }

  filterTableData = (e) => {
    if (e.target.value && e.target.value.trim() && e.target.value.trim().length) {
      this.setState({
        loading: true
      });
      const searchQuery = e.target.value;
      const tableData = this.state.completeData.filter(address => address.pin_code.includes(searchQuery));

      this.setState({
        loading: false,
        tableData: tableData,
        searchQuery: searchQuery,
        isPagination: false
      });
    } else {
      this.setState({
        loading: false,
        tableData: this.state.completeData.slice(0, 10),
        searchQuery: '',
        isPagination: true
      });
    }
  }

  render() {
    const tableComponentObj = {
      tableData: this.state.tableData,
      current_page: this.state.current_page,
      loading: this.state.loading,
      isPagination: this.state.isPagination
    }
    return (
      <div className="App">
            <TableComponent tableComponentObj={tableComponentObj} pagination={this.pagination} keyPress={this.filterTableData} />
            <MapComponent tableComponentObj={tableComponentObj} />         
        }
      </div>
    );
  }
}

export default App;
