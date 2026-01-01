import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="containers">
        <div className="wrapper">
          <div className="text-center">
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {/* FAQ 1 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 0 ? "active" : ""}`}
                onClick={() => toggleFAQ(0)}
              >
                <span className="sr">01.</span> What is Satta King and who started it?
              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 0 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  Satta King is a kind of lottery game based on numbers from 00 to 99 which comes under <b>"Gambling"</b>. The real name of this game in Satta Matka, in which 
				  <b>"Satta"</b> means betting or gambling and <b>"Matka"</b> means a pot through which a number is drawn out. Over the decades, after official bans, it grew —disjointedly and very slowly — into Satta, a lottery-like game in which players bet on whether they can pick the correct numbers. Some mental bankettage explains why it cuts across India in distinct regional markets like Delhi, Disawar and Galion, each with its own legacy and timings.
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 1 ? "active" : ""}`}
                onClick={() => toggleFAQ(1)}
              >
                <span className="sr">02.</span> What is the significance of A7 Satta in the Satta King world?
              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 1 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  A7 Satta is one of the best websites that offers verified Satta King results, historical charts, betting tips and a safe and private gambling services. It supports players through the publication of immediate results, new draw alerts, responsible gaming education and user data privacy. It’s old-established image appeals to both new and experienced gamblers aiming for a site that can offer them clear transparency.
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 2 ? "active" : ""}`}
                onClick={() => toggleFAQ(2)}
              >
                <span className="sr">03.</span> How to play Satta King with A7 Satta?
              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 2 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
To play, players sign up at A7 Satta or its apps, choose a market, choose a number from 00 to 99 and bet as per bet type variations (single, Jodi or Panna). If the selected figure hits after a draw and it's matches with the result called on that market.
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 3 ? "active" : ""}`}
                onClick={() => toggleFAQ(3)}
              >
                <span className="sr">04.</span> What are Satta King bets and their main payout ratios?
              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 3 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
					Common bet types include:<br/>
				
                <b>Ank:</b> Single:  bet to wager on any single digit between 0 and 9. <br/>
				<b>Jodi (Pair):</b> a wager on two high or low digits (00–99); usually has the highest pay-out.<br/>
				<b>Panna (Treble):</b> Bet on 3-digit combinations.<br/>
				There are side bets and varied pay tables but these are the most popular. Payouts depend on the bet and market, but can be between 90 and 960 times the amount bet.
                </div>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 4 ? "active" : ""}`}
                onClick={() => toggleFAQ(4)}
              >
                <span className="sr">05.</span> How can a player check the results to keep up with Satta King markets?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 4 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  A7 Satta earlier announced official draw results on its website and push notifications immediately. Each market has an online results portal and specific timing as well. Results and patterns are archived as well, that players can check to decide their next bet on but they should make use of credible sources in order not to get deceived by scams.
                </div>
              </div>
            </div>

            <div className="container01">
              <div
                className={`question ${activeIndex === 5 ? "active" : ""}`}
                onClick={() => toggleFAQ(5)}
              >
                <span className="sr">06.</span> What are the Satta King India Laws and regulations?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 5 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  In most of the Indian states, which don’t host lotto, Satta King is considered illegal and a punishable criminal offense. Engaging in or aiding Satta betting, except by authorized agency or lotteries, can lead to penalization and imprisonment. Online Satta is risky, but it’s nevertheless widely available through the law gray—[subscribers/users] must personally check local laws for legality before playing.

                </div>
              </div>
            </div>

            <div className="container01">
              <div
                className={`question ${activeIndex === 6 ? "active" : ""}`}
                onClick={() => toggleFAQ(6)}
              >
                <span className="sr">07.</span> What are the dangers of playing Satta King online and offline?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 6 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  Key risks include:<br/>
					<b>Financial losses:</b> House odds are heavy.<br/>
					<b>Addiction:</b> High-speed, high-reward gaming may contribute to gambling addiction.<br/>
					<b>Liability:</b> Unregulated gambling is illegal.<br/>
					<b>Cybersecurity or fraud:</b> Some websites are fake, without guaranteed payouts and protection of data. People must be sure of safety and privacy when it comes to playing on platforms such as A7 Satta.
                </div>
              </div>
            </div>

            <div className="container01">
              <div
                className={`question ${activeIndex === 7 ? "active" : ""}`}
                onClick={() => toggleFAQ(7)}
              >
                <span className="sr">08.</span> Are there any winning tricks for Satta King?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 7 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">                  
There are no fail-safe systems for wins since the result is random, players however rely on historical charts and past results tracking (such as the one shared by A7 Satta of 
<b>‘Secret Powerball Technique’</b>) to identify a pattern. These tricks may make betting more entertaining, but nothings affects the odds. Gwsportal offers a few important guidelines stressed by seasoned platforms on responsible betting, not chasing losses and playing for fun and not an income.

                </div>
              </div>
            </div>
			
			<div className="container01">
              <div
                className={`question ${activeIndex === 8 ? "active" : ""}`}
                onClick={() => toggleFAQ(8)}
              >
                <span className="sr">09.</span> How does A7 Satta protect user safety, privacy and ensure responsible gaming?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 8 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">                  
A7 Satta user security first: encryption technology for the discreet verification of registered users and confidential treatment of personal data. On a regular basis, the platform shares advice about setting limits, identifying risk signals, taking breaks and seeking help if there is potential for gambling addiction. They also provide legal risk training and links to support services if required.

                </div>
              </div>
            </div>
			
			<div className="container01">
              <div
                className={`question ${activeIndex === 9 ? "active" : ""}`}
                onClick={() => toggleFAQ(9)}
              >
                <span className="sr">10.</span> What distinguishes A7 Satta's business partners, like A1 Satta and B7 Satta?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 9 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">                  
A1 Satta and B7 Satta are part of a reliable smart betting business model exchanging verified results, data analytics and player support with A7 Satta. Between them, they provide access to several markets, improve the transparency of draw results and promote a community who engage in responsible betting. Their joining of forces extends trust across platforms enabling the access to a larger market and an even bigger playerbase.

                </div>
              </div>
            </div>


            {/* Add more FAQs below as needed */}
          </div>
        </div>
      </div>
    </section>
  );
}

