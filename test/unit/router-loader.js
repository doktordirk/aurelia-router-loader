describe('Aurelia router loader', () => {
  var mockedConfiguration;

  beforeEach(() => {
    mockedConfiguration = new ConfigStub();
    configure(mockedConfiguration);
  });

  it('should register a global resource', () => {
    expect(mockedConfiguration.resources).toContain('./hello-world');
  });

});
