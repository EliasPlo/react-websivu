const Lomake = () => {

    return (
        <div className="lomake">
        <h2>Lomake</h2>
        <form>
            <label>
                Nimi: <input type="text" name="nimi" />
            </label><br />
            <label>
                Puhelin: <input type="text" name="puhelin" />
            </label><br />
            <label>
                Aihe: <input type="text" name="aihe" />
            </label><br />
            <input type="submit" value="Lähetä" />
        </form>
        </div>
    )
    }

export default Lomake