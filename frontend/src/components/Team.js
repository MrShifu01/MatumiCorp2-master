import { useRef, useState } from "react";
import useIntersectionObserver from "./IntersectionObserver";
import * as bootstrap from "bootstrap";
import { useEffect } from "react";

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalInstance, setModalInstance] = useState(null);
  const h2Ref = useRef();
  const modalRef = useRef();
  const isIntersecting = useIntersectionObserver(h2Ref, { threshold: 0.5 });

  useEffect(() => {
    if (modalRef.current && !modalInstance) {
        const instance = new bootstrap.Modal(modalRef.current);
        setModalInstance(instance);
    }
    return () => {
        if (modalInstance) {
            modalInstance.dispose();
        }
    }
}, [modalRef, modalInstance]);


  const openModal = () => {
    modalInstance.show();
  };

  const closeModal = () => {
    modalInstance.hide();
  };

  return (
    <div>
      <div
        ref={modalRef}
        class="modal fade show"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {selectedMember?.name}
              </h5>
            </div>
            <div class="modal-body">{selectedMember?.description}</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="team bg-#F4F4F4" id="team">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-6 offset-md-3">
              <h2
                ref={h2Ref}
                className={`about-title text-center text-dark mt-6 invisible-h2 ${
                  isIntersecting ? "animate-slide-in" : ""
                }`}
              >
                Team
              </h2>
            </div>
          </div>

          <div className="row gy-3 pb-5">
            {/* Jane */}
            <button
              onClick={() => {
                setSelectedMember({
                  name: "Jane Ashburner",
                  description: "Jane has over 25 years of M&A experience and spent 10 years as a management consultant. She manages the entire M&A process including deal origination, pre-deal analysis and preparation, marketing, deal structuring and transaction execution.",
                });
                openModal();
              }}
              className="col-lg-3 col-md-6 border-0 bg-white"
            >
              <div className="card h-100 shadow">
                <img className="card-img-top" src="jane.webp" alt="Jane" />
                <div className="card-body">
                  <h5 className="card-title">Jane Ashburner</h5>
                  <p className="card-text">
                  Co-Founder
                  </p>
                </div>
              </div>
            </button>

            {/* Patrick */}
            <button
              onClick={() => {
                setSelectedMember({
                  name: "Patrick Glyn",
                  description: "Patrick is a qualified CA with over 35 years experience in corporate advisory services. He is primarily responsible for valuations, information memorandum compilations and accounting, financial, tax and legal structuring work.",
                });
                openModal();
              }}
              className="col-lg-3 col-md-6 border-0 bg-white"
            >
              <div className="card h-100 shadow">
                <img className="card-img-top" src="patrick.webp" alt="Jane" />
                <div className="card-body">
                  <h5 className="card-title">Patrick Glyn</h5>
                  <p className="card-text">
                  Co-Founder
                  </p>
                </div>
              </div>
            </button>

            {/* Philip */}
            <button
              onClick={() => {
                setSelectedMember({
                  name: "Philip Rogers",
                  description: "Philip has worked for McKinsey & Company and  Ethos Private Equity. He focuses on diagnostics, developing the investment thesis, strategy development,& post-merger integration. Philip has a BBusSci Hons from UCT and an MBA from INSEAD.",
                });
                openModal();
              }}
              className="col-lg-3 col-md-6 border-0 bg-white"
            >
              <div className="card h-100 shadow">
                <img className="card-img-top" src="philip.webp" alt="Jane" />
                <div className="card-body">
                  <h5 className="card-title">Philip Rogers</h5>
                  <p className="card-text">
                  Investment Professional
                  </p>
                </div>
              </div>
            </button>

            {/* Michael */}
            <button
              onClick={() => {
                setSelectedMember({
                  name: "Michael Egner",
                  description: "Michael has worked for numerous international tech start-ups as well as Ethos Private Equity and the JSE. He focuses on financial analysis, transaction structuring, growth strategy, and fundraising. Michael has a LLB from UCT and a PGDipFS from Oxford.",
                });
                openModal();
              }}
              className="col-lg-3 col-md-6 border-0 bg-white"
            >
              <div className="card h-100 shadow">
                <img className="card-img-top" src="micheal.webp" alt="Jane" />
                <div className="card-body">
                  <h5 className="card-title">Michael Egner</h5>
                  <p className="card-text">
                  Investment Professional
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
