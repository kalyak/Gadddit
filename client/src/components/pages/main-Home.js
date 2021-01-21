import { Container, Row, Badge, Col } from "react-bootstrap";
import qna from "../image/qna.jpg";
import qnabubbles from "../image/qnabubbles.png";

const Home = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1 style={{ fontSize: "80px" }}>GADDDIT</h1>
      </Row>
      <Row className="justify-content-md-center">
        <h3>An integrated platform for all your event needs!</h3>
      </Row>
      <Row className="justify-content-md-center">
        <h6 className="text-center">
          Your event participants might find large/ small crowds intimidating to
          ask questions. Our platform is not only catered for such group of
          people, It may also help increasing engagement between organizer and
          participants, even after the event ends!
        </h6>
      </Row>

      <br />

      <Row className="justify-content-md-center">
        <br />
        <br />
        <br />
        <h5>
          Engage and captivate your participants even more with our platform
        </h5>
      </Row>

      <Row className="justify-content-md-center">
        <Col sm={4}>
          <img src={qnabubbles} alt="qnabubble" height="300" />
        </Col>

        <Col sm={4}>
          <Row>
            <Col>
              <h3 className="text-center">
                <Badge pill variant="secondary">
                  Workshops
                </Badge>
              </h3>
              <h3 className="text-center">
                <Badge pill variant="secondary">
                  Meeting
                </Badge>
              </h3>
              <h3 className="text-center">
                <Badge pill variant="secondary">
                  Conference
                </Badge>
              </h3>
              <h3 className="text-center">
                <Badge pill variant="secondary">
                  Townhall
                </Badge>
              </h3>
              <h3 className="text-center">
                <Badge pill variant="secondary">
                  Webinars
                </Badge>
              </h3>
              <h3 className="text-center">
                <Badge pill variant="secondary">
                  Or any events..
                </Badge>
              </h3>
            </Col>
          </Row>
        </Col>

        <Col sm={4}>
          <img src={qna} alt="qna" height="350" />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
