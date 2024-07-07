import styles from "./styles.module.scss";
import React, { useState } from "react";

function FaqsComponent() {
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>(
    {}
  );

  const faqsData = [
    {
      id: "1",
      question: "How can I track the status of my order?",
      answer:
        "After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the My Orders section to track your delivery status.",
    },
    {
      id: "2",
      question: "What payment methods do you accept?",
      answer:
        "After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the My Orders section to track your delivery status.",
    },
    {
      id: "3",
      question: "How can I return or exchange an item?",
      answer:
        "After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the My Orders section to track your delivery status.",
    },
  ];

  const handleQuestionClick = (questionId: string) => {
    setOpenQuestions((prevOpenQuestions) => ({
      ...prevOpenQuestions,
      [questionId]: !prevOpenQuestions[questionId],
    }));
    console.log(openQuestions);
  };

  return (
    <div className={styles.wrapper1}>
      <div className={styles.wrapper}>
        <div className={styles.faqsContainer}>
          <h2 className={styles.textH2}>FAQ</h2>
          {faqsData.map((faq) => (
            <div key={faq.id} className={styles.faqItem}>
              <div className={styles.line}></div>
              <div
                className={`${styles.question} ${
                  openQuestions[faq.id] ? styles.active : ""
                }`}
                onClick={() => handleQuestionClick(faq.id)}
              >
                <div className={styles.questionIcon}>
                  <h3>{faq.question}</h3>
                  <div
                    className={`${styles.icon} ${
                      openQuestions[faq.id] ? styles.active1 : ""
                    }`}
                  >
                    +
                  </div>
                </div>
                {openQuestions[faq.id] && (
                  <div className={styles.answer}>{faq.answer}</div>
                )}
              </div>
              <div className={styles.line}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FaqsComponent;
