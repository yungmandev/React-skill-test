import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import endpoints from "../../constants/endpoints";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Timesheets = () => {
  const navigate = useNavigate();
  let { pId } = useParams();
  const [tdata, setTimeData] = useState([]);
  const [tempTdata, setTempTimeData] = useState([]);
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const [years, setYear] = useState([]);
  const [seletedYear, setSetYear] = useState("all" as string);
  const [seletedMonth, setSetMonth] = useState("all" as string);

  useEffect(() => {
    fetch("/" + endpoints.timesheets, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        let timeData: any = [];
        let yearsData: any = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].userId === pId) {
            timeData.push(res[i]);
            let year = res[i].startTime.split("-")[0];
            if (yearsData.indexOf(year) === -1) {
              yearsData.push(year);
            }
          }
        }
        setTimeData(timeData);
        setTempTimeData(timeData);
        setYear(yearsData.sort());
      })
      .catch((err) => err);
  }, []);
  useEffect(() => {
    if (tdata.length > 0 && seletedYear !== "all" && seletedMonth !== "all") {
      let filteredData: any = [];
      for (let i = 0; i < tdata.length; i++) {
        let date: string = tdata[i]["startTime"];
        let filterVal = seletedYear + "-" + seletedMonth;
        if (date.indexOf(filterVal) > -1) {
          filteredData.push(tdata[i]);
        }
      }
      setTempTimeData(filteredData);
    }
    if (seletedYear === "all" || seletedMonth === "all") {
      setTempTimeData(tdata);
    }
  }, [seletedMonth, seletedYear]);
  const handleMChange = (e: any) => {
    setSetMonth(e.target.value);
  };
  const handleYChange = (e: any) => {
    setSetYear(e.target.value);
  };

  return (
    <div className="post-add-page mt-10">
      <div className="page-header flex justify-between px-7 mb-7">
        <div className="page-title text-3xl text-zinc-900 font-bold">
          Timesheets
        </div>
        <div className="actions">
          <Button variant="outline-primary" onClick={() => navigate("/work")}>
            Back
          </Button>
        </div>
      </div>
      <div className="page-body mt-10">
        <div className="d-flex gap-2 mb-5">
          <Form.Group controlId="formGridState" className="w-25">
            <Form.Label>Year</Form.Label>
            <Form.Control as="select" onChange={handleYChange}>
              <option value="all">All</option>
              {years.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formGridState" className="w-25">
            <Form.Label>Month</Form.Label>
            <Form.Control as="select" onChange={handleMChange}>
              <option value="all">All</option>
              {months.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Assessment</th>
              <th>BreakMinutes</th>
              <th>Minutes</th>
              <th>StartTime</th>
              <th>EndTime</th>
              <th>Note</th>
              <th>Status</th>
              <th>LocationChecked</th>
            </tr>
          </thead>
          <tbody>
            {tempTdata &&
              tempTdata.map((row: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{row.assessment}</td>
                    <td>{row.breakMinutes}</td>
                    <td>{row.minutes}</td>
                    <td>{row.startTime}</td>
                    <td>{row.endTime}</td>
                    <td>{row.note}</td>
                    <td>{row.status}</td>
                    <td>{row.locationCuserIdhecked}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Timesheets;
