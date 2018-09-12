import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import { Injectable, Component } from '@angular/core';

/**
 * Json node data with nested structure. Each node has a filename and a value or a list of children
 */
export class FileNode {
  children?: FileNode[];
  filename: string;
  route: string;
  icon: string;
  level: number;
}

/** Flat node with expandable and level information */
export class FileFlatNode {
  constructor(
    public expandable: boolean, public filename: string, public level: number, public icon: string, public route: string) {}
}

/**
 * The Json tree data in string. The data could be parsed into Json object
 */
const TREE_DATA = JSON.stringify({
  Administración: [{
    name: 'Gestión de Usuarios',
    icon: 'person',
    link: 'admin/users'
  }],
  Documents: {
    angular: {
      src: {
        compiler: 'ts',
        core: 'ts'
      }
    },
    material2: {
      src: {
        button: 'ts',
        checkbox: 'ts',
        input: 'ts'
      }
    }
  }
});

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Parse the string to json object.
    const dataObject = JSON.parse(TREE_DATA);

    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.
    const data: FileNode[] = [];

    const node = new FileNode();

    node.filename = 'Administración';
    node.icon = 'dashboard';
    node.route = '/admin';
    node.level = 0;
    node.children = [
      {
        filename: 'Gestión de Usuarios',
        icon: 'person',
        route: '/admin/user',
        level: 1
      }
    ];

    const node1 = new FileNode();

    node1.filename = 'Administración1';
    node1.icon = 'dashboard1';
    node1.route = '/admin';
    node1.level = 0;
    node1.children = [
      {
        filename: 'Gestión de Usuarios1',
        icon: 'person1',
        route: '/admin/roles1',
        level: 1
      }
    ];

    data.push(node);
    data.push(node1);

    //this.buildFileTree(dataObject, 0);

    console.log(data);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.

  buildFileTree(obj: object, level: number): FileNode[] {

    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new FileNode();
      node.filename = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }*/
}

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-tree-menu',
  template: `
    <mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
      <mat-tree-node *matTreeNodeDef="let node" matTreeNodeToggle>
        <a class="menu" mat-list-item [routerLink]="node.route" routerLinkActive="active">
          {{node.filename}}
        </a>
      </mat-tree-node>

      <mat-tree-node *matTreeNodeDef="let node; when: hasChild">

        <div matTreeNodeToggle (click)="toggle(node)" [attr.aria-label]="'toggle ' + node.filename">
          <a class="menu" mat-list-item routerLinkActive="active">
            {{node.filename}} <span class="spacer"></span>
            <mat-icon class="mat-icon-rtl-mirror">
            {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}
          </mat-icon>
          </a>
        </div>

      </mat-tree-node>
    </mat-tree>
  `,
  styles: [`

    mat-tree-node, mat-tree-node > a {
      with: 100%;
    }

  `],
  providers: [FileDatabase]
})
export class TreeMenuComponent {
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;

  constructor(database: FileDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => this.dataSource.data = data);
  }

  transformer = (node: FileNode, level: number) => {
    return new FileFlatNode(!!node.children, node.filename, level, node.icon, node.route);
  }

  private _getLevel = (node: FileFlatNode) => node.level;

  private _isExpandable = (node: FileFlatNode) => node.expandable;

  private _getChildren = (node: FileNode): Observable<FileNode[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;

  toggle(nodo: FileFlatNode) {
    if (nodo.level === 0 && !this.treeControl.isExpanded(nodo)) {
      this.treeControl.collapseAll();
    } else {
      this.treeControl.expand(nodo);
    }
  }


}
