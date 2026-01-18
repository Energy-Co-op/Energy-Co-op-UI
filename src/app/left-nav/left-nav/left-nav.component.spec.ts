import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LeftNavComponent} from './left-nav.component';
import {provideRouter} from '@angular/router';
import {AuthService} from '@auth0/auth0-angular';
import {UserService} from '../../service/user.service';
import {Subject} from 'rxjs';

describe('LeftNavComponent', () => {
  let component: LeftNavComponent;
  let fixture: ComponentFixture<LeftNavComponent>;
  let mockAuthService: any;
  let mockUserService: any;
  let isAuthenticatedSubject: Subject<boolean>;
  let hasGraigFathaPermissionSubject: Subject<boolean>;
  let hasAdminPermissionSubject: Subject<boolean>;
  let hasReadDocTaxPermissionSubject: Subject<boolean>;

  beforeEach(async () => {
    isAuthenticatedSubject = new Subject<boolean>();
    hasGraigFathaPermissionSubject = new Subject<boolean>();
    hasAdminPermissionSubject = new Subject<boolean>();
    hasReadDocTaxPermissionSubject = new Subject<boolean>();

    mockAuthService = {
      isAuthenticated$: isAuthenticatedSubject.asObservable()
    };
    mockUserService = {
      hasPermission$: jest.fn().mockImplementation((permission: string) => {
        if (permission === 'read:gf-stats-basic') {
          return hasGraigFathaPermissionSubject.asObservable();
        } else if (permission === 'read:admin') {
          return hasAdminPermissionSubject.asObservable();
        } else if (permission === 'read:doc-tax') {
          return hasReadDocTaxPermissionSubject.asObservable();
        }
        return new Subject<boolean>().asObservable();
      })
    };

    await TestBed.configureTestingModule({
      imports: [LeftNavComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set isAuthenticated when auth emits', () => {
      isAuthenticatedSubject.next(true);
      expect(component.isAuthenticated).toBe(true);
      isAuthenticatedSubject.next(false);
      expect(component.isAuthenticated).toBe(false);
    });

    it('should set canViewGraigFatha when userService emits for gf-stats permission', () => {
      hasGraigFathaPermissionSubject.next(true);
      expect(component.canViewGraigFatha).toBe(true);
      hasGraigFathaPermissionSubject.next(false);
      expect(component.canViewGraigFatha).toBe(false);
    });

    it('should set canAccessAdmin when userService emits for admin permission', () => {
      hasAdminPermissionSubject.next(true);
      expect(component.canAccessAdmin).toBe(true);
      hasAdminPermissionSubject.next(false);
      expect(component.canAccessAdmin).toBe(false);
    });

    it('should set canViewDocuments when userService emits for doc-tax permission', () => {
      hasReadDocTaxPermissionSubject.next(true);
      expect(component.canViewDocuments).toBe(true);
      hasReadDocTaxPermissionSubject.next(false);
      expect(component.canViewDocuments).toBe(false);
    });
  });

  describe('showGraigFathaLink', () => {
    it('should return true only if both isAuthenticated and canViewGraigFatha are true', () => {
      component.isAuthenticated = false;
      component.canViewGraigFatha = false;
      expect(component.showGraigFathaLink).toBe(false);

      component.isAuthenticated = true;
      component.canViewGraigFatha = false;
      expect(component.showGraigFathaLink).toBe(false);

      component.isAuthenticated = false;
      component.canViewGraigFatha = true;
      expect(component.showGraigFathaLink).toBe(false);

      component.isAuthenticated = true;
      component.canViewGraigFatha = true;
      expect(component.showGraigFathaLink).toBe(true);
    });
  });

  describe('showAdmin', () => {
    it('should return true only if both isAuthenticated and canAccessAdmin are true', () => {
      component.isAuthenticated = false;
      component.canAccessAdmin = false;
      expect(component.showAdmin).toBe(false);

      component.isAuthenticated = true;
      component.canAccessAdmin = false;
      expect(component.showAdmin).toBe(false);

      component.isAuthenticated = false;
      component.canAccessAdmin = true;
      expect(component.showAdmin).toBe(false);

      component.isAuthenticated = true;
      component.canAccessAdmin = true;
      expect(component.showAdmin).toBe(true);
    });
  });

  describe('showDocumentsLink', () => {
    it('should return true only if both isAuthenticated and canViewDocuments are true', () => {
      component.isAuthenticated = false;
      component.canViewDocuments = false;
      expect(component.showDocumentsLink).toBe(false);

      component.isAuthenticated = true;
      component.canViewDocuments = false;
      expect(component.showDocumentsLink).toBe(false);

      component.isAuthenticated = false;
      component.canViewDocuments = true;
      expect(component.showDocumentsLink).toBe(false);

      component.isAuthenticated = true;
      component.canViewDocuments = true;
      expect(component.showDocumentsLink).toBe(true);
    });
  });
});
