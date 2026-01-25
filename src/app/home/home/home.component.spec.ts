import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {InjectionToken} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {of} from 'rxjs';
import {EnergyMixService} from '../../service/energy-mix.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const AUTH0_CLIENT = new InjectionToken('auth0.client');
  let energyMixService;

  beforeEach(async () => {
    energyMixService = {
      getCurrentGenerationMix: jest.fn()
    };

    energyMixService.getCurrentGenerationMix.mockReturnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{provide: AuthService, useValue: AUTH0_CLIENT}, {
        provide: EnergyMixService,
        useValue: energyMixService
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('title should be set.', () => {
      expect(component.title).toEqual('Energy Co-op User Dashboard');
    });
  });

  describe('ngOnInit', () => {
    it('should call getCurrentGenerationMix on ngOnInit', () => {
      const spy = jest.spyOn(energyMixService, 'getCurrentGenerationMix');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });

    it('should update pieChartData with response data', () => {
      const mockResponse = {
        data: {
          generationmix: [
            { fuel: 'wind', perc: 40 },
            { fuel: 'solar', perc: 20 },
            { fuel: 'coal', perc: 10 }
          ]
        }
      };
      energyMixService.getCurrentGenerationMix.mockReturnValueOnce(of(mockResponse));
      component.ngOnInit();
      expect(component['pieChartData'].labels).toEqual(['Wind', 'Solar', 'Coal']);
      expect(component['pieChartData'].datasets[0].data).toEqual([40, 20, 10]);
      expect(component['pieChartData'].datasets[0].label).toBe('% of energy mix');
    });
  });

  describe('pieChartOptions', () => {
    it('should format datalabels correctly', () => {
      const formatter = component['pieChartOptions'].plugins!.datalabels!.formatter;
      const context = {
        chart: {
          data: {
            labels: ['Wind', 'Solar'],
          },
        },
        dataIndex: 1,
      };
      expect(formatter(20, context)).toBe('Solar: 20%');
      context.dataIndex = 0;
      expect(formatter(40, context)).toBe('Wind: 40%');
      // No label
      context.chart.data.labels = undefined;
      expect(formatter(10, context)).toBe('');
    });
  });
});
