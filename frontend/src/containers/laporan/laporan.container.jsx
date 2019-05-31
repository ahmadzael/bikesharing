import React from "react";
import LoadingOverlay from "react-loading-overlay";

import { MenuWrapper } from "../../components";

import "./laporan.style.css";
import "react-datepicker/dist/react-datepicker.css";

class Laporan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    this._insertLaporan();
    this._getLaporan();
  }

  _insertLaporan() {
    fetch(`/api/sepeda/spinsertlaporan`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {})
      .catch(err => {
        alert("error: " + err);
      });
  }

  _getLaporan() {
    fetch(`/api/sepeda/pinjam`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ data: result });
      })
      .catch(err => {
        alert("error: " + err);
      });
  }

  render() {
    const { data } = this.state;
    const path = this.props.location.pathname.split("/")[1];
    return (
      <LoadingOverlay active={this.state.loading} spinner text="Loading ...">
        <MenuWrapper path={path}>
          <div className="input-container">
            <div className="box">
              <div className="box-header">
                <h4>
                  <strong>Laporan</strong>
                </h4>
              </div>
              <div className="box-body">
                <table
                  id="tableData"
                  className="table table-striped table-responsive table-bordered"
                >
                  <thead>
                    <tr>
                      <td>No</td>
                      <td>Id Laporan</td>
                      <td>Tanggal Pinjam</td>
                      <td>Anggota</td>
                      <td>Denda</td>
                      <td>Status</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((dt, index) => {
                      return (
                        <tr key={index}>
                          <td className="center">{index + 1}</td>
                          <td>{dt.nomor}</td>
                          <td>{dt.pinjam}</td>
                          <td>{dt.peminjam}</td>
                          <td>{dt.denda}</td>
                          <td>{dt.kembali !== null ? "Selesai" : "Proses"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </MenuWrapper>
      </LoadingOverlay>
    );
  }
}

export default Laporan;
