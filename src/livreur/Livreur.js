import { uniq, without } from "lodash";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, Tag, Spin, Alert, Button } from "antd";
import api from "../api";
import logo from "../pool/logo_ravitailleur.svg";
import "antd/dist/antd.less";
import {
  LeftSquareTwoTone,
  PhoneTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import "./Livreur.css";

const { Title, Paragraph } = Typography;

const Livreur = () => {
  const { livreurId } = useParams();
  const [livreurData, setLivreurData] = useState(null);
  const [date, setDate] = useState(null);
  const [validatedTasks, setValidatedTasks] = useState(
    localStorage.getItem(`ravit-livreur-${livreurId}-validatedTasks`)
      ? JSON.parse(
          localStorage.getItem(`ravit-livreur-${livreurId}-validatedTasks`)
        )
      : []
  );
  const setValidatedTasksAndSave = (tasks) => {
    setValidatedTasks(tasks);
    localStorage.setItem(
      `ravit-livreur-${livreurId}-validatedTasks`,
      JSON.stringify(tasks)
    );
  };
  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get(`/delivery/${livreurId}`);
      setLivreurData(data);
    };
    getData();
  }, [livreurId]);
  if (!livreurData)
    return (
      <div className="Livreur__SpinContainer">
        <img src={logo} className="Livreur__Logo" alt="logo" />
        <Spin tip="Chargement..." />
      </div>
    );
  if (!livreurData.livreur)
    return (
      <>
        <img src={logo} className="Livreur__Logo" alt="logo" />
        <Alert
          message="Livreur non trouvé"
          description="Veuillez vérifier le lien qui vous a été fourni"
          type="error"
        />
      </>
    );
  const dates = uniq(livreurData.tasks.map((d) => d.date));
  if (!date) {
    return (
      <div className="Livreur__Details">
        <img src={logo} className="Livreur__Logo" alt="logo" />
        <Paragraph>Bonjour {livreurData.livreur} !</Paragraph>
        <Paragraph>
          Merci beaucoup d'aider notre association, nous allons grâce à vous
          distribuer un grand nombre de repas aux plus démunis
        </Paragraph>
        <Title level={2}>Vos documents</Title>
        <Paragraph>Dérogation</Paragraph>
        <Title level={2}>Votre planning</Title>
        {dates.length === 0 && (
          <p>
            <em>Aucun planning à venir</em>
          </p>
        )}
        {dates.map((d) => (
          <a onClick={() => setDate(d)}>
            {d}
            <br />
          </a>
        ))}
      </div>
    );
  }
  let planningId = null;
  const tournees = [];
  livreurData.tasks.forEach((d) => {
    if (d.date === date) {
      if (d.planningId !== planningId) {
        tournees.push([]);
        planningId = d.planningId;
      }
      tournees[tournees.length - 1].push(d);
    }
  });

  return (
    <div className="Livreur__Tournee">
      <LeftSquareTwoTone
        onClick={() => setDate(null)}
        className="Livreur__Back"
      />
      <br />
      {tournees.map((tasks, tourneeIndex) => (
        <div className="Livreur__Tournee">
          <Title level={4}>Tournée {tourneeIndex + 1}</Title>
          <Paragraph>
            Le {date}, {tasks[0].horaire}
          </Paragraph>
          <Paragraph>Vous avez {tasks.length} points de livraison</Paragraph>
          {tasks.map((task) => {
            const taskIsDone = validatedTasks.indexOf(task.id) > -1;
            return (
              <Card
                title={
                  <span>
                    {task.phone && (
                      <span>
                        <PhoneTwoTone
                          onClick={() =>
                            (window.location.href = `tel:${task.phone}`)
                          }
                        />
                        &nbsp;&nbsp;
                      </span>
                    )}
                    {task.contact}
                  </span>
                }
                extra={
                  taskIsDone ? (
                    <span>
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                      &nbsp;&nbsp;
                      <Button
                        type="dashed"
                        size="small"
                        onClick={() =>
                          setValidatedTasksAndSave(
                            without(validatedTasks, task.id)
                          )
                        }
                      >
                        Annuler
                      </Button>
                    </span>
                  ) : (
                    <Tag color="blue">
                      {task.destinationId.startsWith("A") ? "ASSO" : "CHEF"}
                    </Tag>
                  )
                }
                className={`Livreur__Tournee ${
                  taskIsDone ? "Livreur__Tournee--done" : ""
                }`}
              >
                <p>
                  <a
                    href={encodeURI(
                      `https://www.google.com/maps/place/${task.fullAddress}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {task.fullAddress}
                  </a>
                </p>
                {task.complementAddress && (
                  <p>
                    <em>{task.complementAddress}</em>
                  </p>
                )}
                {task.details && (
                  <p>
                    <em>{task.details}</em>
                  </p>
                )}
                {task.comment && (
                  <p>
                    <em>{task.comment}</em>
                  </p>
                )}
                <p>
                  {task.recuperer > 0 && (
                    <Tag color="purple">Récupérer: {task.recuperer}</Tag>
                  )}
                  {task.deposer > 0 && (
                    <Tag color="magenta">Déposer: {task.deposer}</Tag>
                  )}
                </p>
                <Button
                  onClick={() =>
                    setValidatedTasksAndSave(uniq([...validatedTasks, task.id]))
                  }
                >
                  <CheckCircleTwoTone twoToneColor="#52c41a" /> Valider la tâche
                </Button>
              </Card>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const LivreurContainer = () => (
  <div className="Livreur__Container">
    <Livreur />
  </div>
);

export default LivreurContainer;
