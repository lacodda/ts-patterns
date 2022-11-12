class DocumentItem {
  public text?: string;
  private state!: DocumentItemState;

  constructor() {
    this.setState(new DraftDocumentItemState());
  }

  getState(): DocumentItemState {
    return this.state;
  }

  setState(state: DocumentItemState): void {
    this.state = state;
    this.state.setContext(this);
  }

  publishDoc(): void {
    this.state.publish();
  }

  deleteDoc(): void {
    this.state.delete();
  }
}

// DocumentItemState
abstract class DocumentItemState {
  public name!: string;
  public item!: DocumentItem;

  public setContext(item: DocumentItem): void {
    this.item = item;
  }

  public abstract publish(): void;
  public abstract delete(): void;
}

// DraftDocumentItemState
class DraftDocumentItemState extends DocumentItemState {
  constructor() {
    super();
    this.name = 'DraftDocument';
  }

  public publish(): void {
    if (!this.item?.text) {
      return;
    }
    console.log(`Published text: ${this.item.text}`);
    this.item.setState(new PublishDocumentItemState());
  }

  public delete(): void {
    console.log('Document deleted');
  }
}

// PublishDocumentItemState
class PublishDocumentItemState extends DocumentItemState {
  constructor() {
    super();
    this.name = 'PublishDocument';
  }

  public publish(): void {
    console.log('Document already published');
  }

  public delete(): void {
    this.item.setState(new DraftDocumentItemState());
    console.log('Document removed from publication');
  }
}

// Use
const documentItem = new DocumentItem();
documentItem.text = 'text';
console.log(documentItem.getState());
documentItem.publishDoc();
documentItem.publishDoc();
console.log(documentItem.getState());
documentItem.deleteDoc();
console.log(documentItem.getState());
