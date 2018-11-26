<div class="full-card">
  <div class="card-title">
    <div class="card-title-text">
      <i class="fas fa-plus-circle" id="tasks"></i><span class="parent-link">Create New Task</span>
    </div>
    <div class="card-title-button">
      <button class="small-button-red" id="cancelnewtask"><i class="fas fa-minus-circle fa-sm" style="padding-top:4px; padding-right:4px;"></i>Cancel</button>
    </div>
  </div>

  <div class="card-body">
    <div class="input-task-name">
      <p>Name</p>
      <input type="text" id="input-name" class="input-text" placeholder="Task Name, e.g. Google Scrape">
    </div>
    <div class="input-task-url">
      <p>URL</p>
      <input type="text" id="input-site" class="input-text" placeholder="Web Address, e.g. www.google.com">
      <button class="input-button" id="loadsite"><i class="fas fa-arrow-down fa-sm" style="padding-top:4px; padding-right:4px;"></i>Load</button>
    </div>

    <iframe name="iframe" id="iframe" scroll="no" class="site-view"></iframe>

    <div class="task-creator">
        <div class="tab">
          <button class="tablinks active" onclick="changeTab(event, 'actions')">Actions</button>
          <button class="tablinks" onclick="changeTab(event, 'source')">Source</button>
          <button class="tablinks" onclick="changeTab(event, '3')">Next</button>
        </div>

        <div id="actions" class="tabcontent" style="display: block;">
          <div class="panel-container">
            <div class="panel-left">
                  <div class="task-toolbar">
                <button class="toolbar-button-new" id="new-text-element"><i class="fas fa-font fa-sm" style="padding-top:4px; padding-right:4px;"></i>Text</button>
                <button class="toolbar-button-new" id="new-link-element"><i class="fas fa-link fa-sm" style="padding-top:4px; padding-right:4px;"></i>Link</button>
                <button class="toolbar-button-new" id="new-image-element"><i class="fas fa-image fa-sm" style="padding-top:4px; padding-right:4px;"></i>Image</button>
                <button class="toolbar-button-new" id="new-page-element"><i class="fas fa-mouse-pointer fa-sm" style="padding-top:4px; padding-right:4px;"></i>Page</button>
              </div>
              <div class="action-tree" id="action-tree">

              </div>
            </div>

            <div class="splitter">
            </div>

            <div class="panel-right" id="panel-right">
                right panel
            </div>
          </div>
        </div>

      <div id="source" class="tabcontent">

      </div>

      <div id="3" class="tabcontent">

      </div>
    </div>

      <button class="run-button" id="runscrapey" onclick="saveTree()"><i class="fas fa-arrow-down fa-sm" style="padding-top:4px; padding-right:4px;"></i>Save</button>
      <button class="run-button" id="runscrapey" onclick="startScrapey()"><i class="fas fa-arrow-down fa-sm" style="padding-top:4px; padding-right:4px;"></i>Run</button>
  </div>
</div>
