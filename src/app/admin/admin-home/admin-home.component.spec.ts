import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AdminHomeComponent} from './admin-home.component';
import {SiteInfoService} from '../../service/site-info.service';
import {AdminService} from '../../service/admin.service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {of, throwError} from 'rxjs';

describe('AdminHomeComponent', () => {
  let component: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;
  let mockSiteInfoService: jest.Mocked<SiteInfoService>;
  let mockAdminService: jest.Mocked<AdminService>;

  beforeEach(async () => {
    mockSiteInfoService = {
      getSuppportedSites: jest.fn().mockReturnValue(of(['Site 1', 'Site 2']))
    } as any;

    mockAdminService = {
      setSavingsRate: jest.fn(),
      refreshPerformanceData: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        AdminHomeComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule
      ],
      providers: [
        FormBuilder,
        { provide: SiteInfoService, useValue: mockSiteInfoService },
        { provide: AdminService, useValue: mockAdminService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with savingsRateForm entries', () => {
    expect(component['savingsRateForm'].get('site')).toBeTruthy();
    expect(component['savingsRateForm'].get('effectiveDate')).toBeTruthy();
    expect(component['savingsRateForm'].get('savingsRate')).toBeTruthy();
    expect(component['savingsRateForm'].get('savingsRate')).toBeTruthy();
  });

  it('should initialize form with performanceDataForm entries', () => {
    expect(component['performanceDataForm'].get('site')).toBeTruthy();
    expect(component['performanceDataForm'].get('startDate')).toBeTruthy();
    expect(component['performanceDataForm'].get('endDate')).toBeTruthy();
  });

  it('should load sites on init', () => {
    expect(mockSiteInfoService.getSuppportedSites).toHaveBeenCalled();
    expect(component['sites']).toEqual(['Site 1', 'Site 2']);
  });

  describe('form submission', () => {
    beforeEach(() => {
      const testDate = new Date('2025-10-05');
      component['savingsRateForm'].patchValue({
        site: 'Site 1',
        effectiveDate: testDate,
        savingsRate: 0.15
      });
    });

    it('should submit form when valid', () => {
      mockAdminService.setSavingsRate = jest.fn().mockReturnValue(of({}));
      const alertSpy = jest.spyOn(window, 'alert');

      component.onSubmit();

      expect(mockAdminService.setSavingsRate).toHaveBeenCalledWith({
        site: 'Site 1',
        effectiveDate: '2025-10-05',
        ratePerKWH: 0.15
      });
      expect(alertSpy).toHaveBeenCalledWith('Savings rate updated successfully');
      expect(component['savingsRateForm'].value).toEqual({
        site: null,
        effectiveDate: null,
        savingsRate: null
      });
    });

    it('should handle API errors', () => {
      mockAdminService.setSavingsRate = jest.fn().mockReturnValue(throwError(() => new Error('API Error')));
      const alertSpy = jest.spyOn(window, 'alert');
      const consoleSpy = jest.spyOn(console, 'error');

      component.onSubmit();

      expect(alertSpy).toHaveBeenCalledWith('Error updating savings rate. Please try again.');
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('should not submit if form is invalid', () => {
      component['savingsRateForm'].get('site').setValue('');

      component.onSubmit();

      expect(mockAdminService.setSavingsRate).not.toHaveBeenCalled();
    });
  });

  describe('performance data form submission', () => {
    beforeEach(() => {
      const testStartDate = new Date('2025-01-01');
      const testEndDate = new Date('2025-01-31');
      component['performanceDataForm'].patchValue({
        site: 'Site 1',
        startDate: testStartDate,
        endDate: testEndDate
      });
    });

    it('should submit performance data form when valid', () => {
      mockAdminService.refreshPerformanceData = jest.fn().mockReturnValue(of({}));
      const alertSpy = jest.spyOn(window, 'alert');

      component.onRefreshPerformanceData();

      expect(mockAdminService.refreshPerformanceData).toHaveBeenCalledWith(
        '2025-01-01',
        '2025-01-31'
      );
      expect(alertSpy).toHaveBeenCalledWith('Performance data refresh initiated successfully');
      expect(component['performanceDataForm'].value).toEqual({
        site: null,
        startDate: null,
        endDate: null
      });
    });

    it('should handle API errors in performance data refresh', () => {
      mockAdminService.refreshPerformanceData = jest.fn().mockReturnValue(throwError(() => new Error('API Error')));
      const alertSpy = jest.spyOn(window, 'alert');
      const consoleSpy = jest.spyOn(console, 'error');

      component.onRefreshPerformanceData();

      expect(alertSpy).toHaveBeenCalledWith('Error refreshing performance data. Please try again.');
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('should not submit performance data form if site is invalid', () => {
      component['performanceDataForm'].get('site').setValue('');

      component.onRefreshPerformanceData();

      expect(mockAdminService.refreshPerformanceData).not.toHaveBeenCalled();
    });

    it('should not submit performance data form if startDate is invalid', () => {
      component['performanceDataForm'].get('startDate').setValue('');

      component.onRefreshPerformanceData();

      expect(mockAdminService.refreshPerformanceData).not.toHaveBeenCalled();
    });

    it('should not submit performance data form if endDate is invalid', () => {
      component['performanceDataForm'].get('endDate').setValue('');

      component.onRefreshPerformanceData();

      expect(mockAdminService.refreshPerformanceData).not.toHaveBeenCalled();
    });

    it('should format dates correctly in API call', () => {
      const testStartDate = new Date('2025-06-15');
      const testEndDate = new Date('2025-12-25');
      component['performanceDataForm'].patchValue({
        site: 'Site 2',
        startDate: testStartDate,
        endDate: testEndDate
      });
      mockAdminService.refreshPerformanceData = jest.fn().mockReturnValue(of({}));

      component.onRefreshPerformanceData();

      expect(mockAdminService.refreshPerformanceData).toHaveBeenCalledWith(
        '2025-06-15',
        '2025-12-25'
      );
    });
  });
});
