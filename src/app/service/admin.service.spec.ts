import {TestBed} from '@angular/core/testing';
import {AdminService} from './admin.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {of} from 'rxjs';
import {SavingsRateUpdate} from '../model/SavingsRateUpdate';
import {SavingsRate} from '../model/SavingsRate';

describe('AdminService', () => {
  let service: AdminService;
  let httpClientMock;
  let userServiceMock;

  beforeEach(() => {
    httpClientMock = {
      post: jest.fn(),
    };

    userServiceMock = {
      getAccessTokenSilently$: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        AdminService,
        { provide: HttpClient, useValue: httpClientMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    });
    service = TestBed.inject(AdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setSavingsRate', () => {
    it('should make authenticated POST request with correct payload', (done) => {
      const mockToken = 'test-token-123';
      const mockPayload: SavingsRateUpdate = {
        site: '123',
        effectiveDate: '',
        ratePerKWH: 0.15
      };
      const mockResponse: SavingsRate = {
        id: '1',
        site: '123',
        effectiveDate: new Date(),
        ratePerKWH: 0.15,
        createdAt: new Date()
      };

      userServiceMock.getAccessTokenSilently$.mockReturnValue(of(mockToken));
      httpClientMock.post.mockReturnValue(of(mockResponse));

      service.setSavingsRate(mockPayload).subscribe(response => {
        expect(userServiceMock.getAccessTokenSilently$).toHaveBeenCalled();
        expect(httpClientMock.post).toHaveBeenCalledWith(expect.stringContaining('/admin/savings-rate'), expect.any(Object), expect.any(Object));
        expect(response).toEqual(mockResponse);
        done();
      });
    });
  });

  describe('refreshPerformanceData', () => {
    it('should make authenticated GET request with correct site, startDate, and endDate parameters', (done) => {
      const mockToken = 'test-token-456';
      const startDate = '2026-01-01';
      const endDate = '2026-01-31';
      const mockResponse = "success";

      userServiceMock.getAccessTokenSilently$.mockReturnValue(of(mockToken));
      httpClientMock.get = jest.fn().mockReturnValue(of(mockResponse));

      service.refreshPerformanceData(startDate, endDate).subscribe(response => {
        expect(userServiceMock.getAccessTokenSilently$).toHaveBeenCalled();
        expect(httpClientMock.get).toHaveBeenCalledWith(
          expect.stringContaining(`/logPerformance/${startDate}/${endDate}`),
          expect.any(Object)
        );
        expect(response).toEqual(mockResponse);
        done();
      });
    });

    it('should include authorization header in GET request', (done) => {
      const mockToken = 'test-token-789';
      const startDate = '2027-02-01';
      const endDate = '2027-02-28';
      const mockResponse = "success";

      userServiceMock.getAccessTokenSilently$.mockReturnValue(of(mockToken));
      httpClientMock.get = jest.fn().mockReturnValue(of(mockResponse));

      service.refreshPerformanceData(startDate, endDate).subscribe(() => {
        const callArgs = httpClientMock.get.mock.calls[0];
        const headers = callArgs[1].headers;
        expect(headers.has('Authorization')).toBeTruthy();
        expect(headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
        done();
      });
    });
  });
});
