import Accordion from 'react-bootstrap/Accordion';

function Report({list}){

  return(
    <div className="Report">
      
      <div className="reportList">
        <Accordion defaultActiveKey="0">
        {
          list.map((data) => {
            return (
              <Accordion.Item eventKey={data.id} key={data.id} data-id={data.id} >
                <Accordion.Header>{data.user.name} {data.book.name} </Accordion.Header>
                <Accordion.Body>
                {data.content}
                </Accordion.Body>
              </Accordion.Item>
            );
          })
        }
        </Accordion>
      </div>
    </div>
  )
}
export default Report;