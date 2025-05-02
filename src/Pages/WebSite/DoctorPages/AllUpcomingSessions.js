export default function AllUpcomingSessions() {
  return (
    <div className="upcoming-sessions pt-50 pb-50 bg-section">
      <div className="title">
        <div className="main-container">
          <h2>All Upcoming Sessions</h2>
        </div>
      </div>
      <div className="sessions">
        <div className="main-container">
          <p>Note: The sessions are sort by nearest date</p>
          <div className="sessions-list">
            <div className="session-item flex justify-between items-center">
              <div className="session-title">
                <img src="" alt="" />
                <div>
                  <h3>Parent's name</h3>
                  <p>Child’s name</p>
                  <p className="child-data">
                    <span>Age:XX</span> <span>Gender:X</span>
                  </p>
                </div>
              </div>
              <span className="session-date">Date: XX/XX/XXXX</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
