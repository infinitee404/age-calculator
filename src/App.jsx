  import { useState } from "react"

  const App = () => {
    //useState for input field
    const [formData, setFormData] = useState({
      day: "",
      month: "",
      year: "",
    })

    // useState for display values
    const [displayDate, setDisplayDate] = useState({
      days: " - - ",
      months: " - - ",
      years: " - - ",
    })

    // useState for checking if any value is invalid
    const [isInvalid, setIsInvalid] = useState({
      day: false,
      month: false,
      year: false,
    })

    // array to store day length for each month
    const daysLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    function handleChange(event){
      // function to get user input values and set user inpur year, month, and day
      let name = event.target.name
      let value = event.target.value  
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [name]: value
        }
      })
    }

    function handleSubmit(event){

      event.preventDefault();
      
      setIsInvalid(prevData => {
        return {
          day: false,
          month: false,
          year:false,
        }
      })
      
      setDisplayDate(prevData => {
        return {
          days: " - - ",
          months: " - - ",
          years:" - - ",
        }
      })
      
      if ( !formData.year || !formData.month || !formData.day ){
        return;
      }

      // check max and min acceptable values for day and month
      if(formData.month < 1 || formData.month > 12){
        setIsInvalid(prevData => ({
          ...prevData,
          month: true,
        }))
        return;
      }
      
      if((formData.day < 1 || formData.day > 31) || (formData.day > daysLength[formData.month-1])){
        setIsInvalid(prevData => ({
          ...prevData,
          day: true,
        }))
        return;
      }

      // get current date and extract year, month, and day
      const currentDate = new Date()
      const currentYear = currentDate.getUTCFullYear();
      const currentMonth = currentDate.getUTCMonth() + 1;
      const currentDay = currentDate.getUTCDate();

      // validation to see if entered date is in the future
      if(formData.year > currentYear){
        setIsInvalid(prevData => ({
          ...prevData,
          year: true,
        }))
        return;
      }else if(formData.year == currentYear && formData.month > currentMonth){
        setIsInvalid(prevData => ({
          ...prevData,
          month: true,
        }))
        return;
      }else if(formData.year == currentYear && formData.month == currentMonth && formData.day > currentDay){
        setIsInvalid(prevData => ({
          ...prevData,
          day: true,
        }))
        return;
      }
      

      let displayYear = currentYear-formData.year
      let displayMonth = currentMonth-formData.month
      let displayDay = currentDay-formData.day
      
      if(formData.month > currentMonth){
        displayYear -= 1;
        displayMonth = 12 - Math.abs(displayMonth); 
      }

      if(formData.day > currentDay){
        displayDay = daysLength[displayMonth] - Math.abs(displayDay)
        displayMonth -= 1;
      }


      setDisplayDate(prevDisplayDate => {
        return {
          days: displayDay,
          months: displayMonth,
          years:displayYear
        }
      })

      setIsInvalid(prevData => {
        return {
          day: false,
          month: false,
          year:false,
        }
      })
    }

    return (
      <>
        <div className="container">
          <form>
            <div className="input-field">

              <div className="input-day">
                <label htmlFor="day">DAY</label>
                <input 
                  type="text" 
                  placeholder="DD"
                  id="day"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                />
                <span className={isInvalid.day ? "error-message" : "error-hidden"}>Must be a valid day</span>
              </div>

              <div className="input-month">
                <label htmlFor="month">MONTH</label>
                <input 
                  type="text"
                  placeholder="MM"
                  id="month"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                />
                <span className={isInvalid.month ? "error-message" : "error-hidden"}>Must be a valid month</span>
              </div>

              <div className="input-year">
                <label htmlFor="year">YEAR</label>
                <input 
                  type="text"
                  placeholder="YYYY"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                />
                <span className={isInvalid.year ? "error-message" : "error-hidden"}>Must be in the past</span>
              </div>
            </div>

            <div className="button">
              <div className="line">&nbsp;</div>
              <button type='submit' onClick={handleSubmit}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAOtJREFUSEvt001KA1EQxPFfTmFAxc9biJhzeAHBA3gNV27ceRQR8RKKShSSOwTUhjfwiBleBwy4mF731L+66s3Ihme0YX0DoJnwv4voq1hOG0svFuEB0HwUfxrRFe4wr7CrAFs4x/Uqe30lX+IGLzjDZ0/J27jHES5wuwzpA4zxgGO846RA6gtC/BF7eMYpZllA7AXkCfsV5KMI7GTEY7f1H4RQRHCI159ODgpgit0S4QQd+FcNLUB8EJCIKy6p563E0iueuaATXIakxNcBdJdEJ4uM885ZJqI6luggANFBatYFpETrpQHQjOwbfHcsGQ0PHpUAAAAASUVORK5CYII="/></button>
            </div>
          
          </form>

          <div className="output-field">
            <h1><span className="value"> {displayDate.years} </span> years</h1>
            <h1><span className="value"> {displayDate.months} </span> months</h1>
            <h1><span className="value"> {displayDate.days} </span> days</h1>
          </div>

        </div>
      </>
    )
  }

  export default App
