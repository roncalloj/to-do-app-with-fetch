import React, { useEffect, useState } from "react";
import "../../styles/index.css";

const App = (props) => {

	const [pendArray, setPendArray] = useState ([]);
	const [pendiente, setPendiente] = useState("");
	const [listo, setListo] = useState(false);

	const URL = "https://assets.breatheco.de/apis/fake/todos/user/";

	useEffect (() =>{
		fetch(URL + props.usuario)
		.then(response => {
			if (response.ok) return response.json()
			console.log(response.statusText)
		})
		.then(data=>setPendArray(data))
		.catch(error => console.error({error}))
	},[])

	useEffect (() =>{
		fetch(URL + props.usuario, {
			method: "PUT",
			body: JSON.stringify(pendArray),
			headers: {
				"Content-Type": "application/json"
			}
		}) .then (response =>{
			if(response.ok) console.log("List updated");
			else console.error(response.statusText);
		}) .catch (error => console.error({error}))
	},[pendArray])

	const Change = (e) => {
		setPendiente(e.target.value);
		setListo(listo => listo)
	}
	
	const SubmitForm = (e) => {
		e.preventDefault();
		if (pendiente !== ""){
			if (pendArray.includes(pendiente) === false) {
				setPendArray([...pendArray, {
					label: pendiente,
					done: listo
				}]);
			}
			else alert ("Esa tarea ya esta incluída");
		}
		else alert ("Introduzca una tarea por hacer");
		setPendiente("");
	}

	const borrarPend = (index) => {
		setPendArray(pendArray.filter((val,i)=>index!=i))
	}

	return (
		<div>
			<h1 className="text-center mt-5">todos</h1>
			<div className="container text-center list-group-item listBox">
				<form onSubmit={SubmitForm}>
					<input type="text" className="d-flex justify-content-start list-group-item inBox" placeholder="Tarea pendiente" name="load" value={pendiente} state={listo.toString()} onChange={Change} />
				</form>
				<ul className="p-0">
					{pendArray.map((pendiente,index)=>{
						return (
						<li key={index} className="list-group-item d-flex justify-content-between mt-1 showbttn">
							<p className="m-0">{pendiente.label}</p>
							<p className="m-0">{pendiente.done}</p>
							<button className="btn-close hid" onClick={() => borrarPend (index)}/>
						</li>
						)
					})}
				</ul>
				<div className="footer list-group-item d-flex justify-content-start p-0">
					{(pendArray.length >= 1)?
						(pendArray.length > 1)?
							pendArray.length + " tareas pendientes"
							:pendArray.length + " tarea pendiente"
					:"Sin pendientes"
					}
				</div>
			</div>
		</div>
	);
};

export default App;
