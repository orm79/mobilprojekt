
<!-- Modal for editing room information, not visible by default -->
<div class="modal" id="modDiv">
  <div class="modal-background" id="modalBg"></div>
  
  <div class="modal-card" id="modalCard">
    
    <header class="modal-card-head">
      <p class="modal-card-title">Redigera rum</p>
      <button class="delete" aria-label="close" id="modCloseBtn"></button>
    </header>
    
    <section class="modal-card-body">

      <h3 class="is-size-5 is-uppercase">Rum <strong>#<span id="roomNr"></span></strong></h3>
      <br>
      <!-- hidden input with the room number, so we can get it with javascript -->
      <div class="field is-hidden"><input type="text" id="modRoomNr"></div>

      <div class="field">
        <label class="label">Information om rum</label>
        <div class="control">
          <textarea class="textarea" id="modRoomInfo" placeholder="Information om rummet"></textarea>
        </div>
      </div>

      <div class="field">
        <label class="label">Kommentar</label>
        <div class="control">
          <textarea class="textarea" id="modRoomCom" placeholder="Kommentar till rummet"></textarea>
        </div>
      </div>

      <div class="field">
        <label class="label">Städstatus</label>
        <div class="control">
          <div class="select">
            <select id="modStatus">
              <option value=1>Städat</option>
              <option value=0>Ej städat</option>
            </select>
          </div>
        </div>
      </div>
      <br>
      
      <h3 class="is-size-6">
        <strong>Uppdaterad</strong>
      </h3>
      <p>
        <span class="icon" aria-hidden="true"><i class="fa fa-calendar-o"></i>
          </span><span class="sr-only">Uppdateringsdatum och tid:</span>
            &nbsp;<span id="modDate"></span>
      </p>
      <p>
        <span class="icon" aria-hidden="true"><i class="fa fa-user-o"></i>
          </span><span class="sr-only">Uppdaterad av användare:</span>
            &nbsp;<span id="modUser"></span>
      </p>
    
    </section>
    
    <footer class="modal-card-foot">
      <button class="button is-success" id="modSaveBtn">Spara</button>
      <button class="button" id="modCancelBtn">Avbryt</button>
    </footer>
  
  </div> <!-- /end modal-background -->
</div> <!-- /end modal -->